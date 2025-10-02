<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\ApplicationExperience;
use App\Models\ApplicationQualification;
use App\Models\ApplicationStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $allRecords = Application::with(['announcement.qualification_requirements.degree', 'announcement.department'])->with('application_status')->get();

            return response()->json([
                'status' => true,
                'data' => $allRecords,
                'message' => 'All records retrieved'
            ], 200);

        }catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $payload = json_decode($request->input('payload'), true);
        $applicationQualification = json_decode($request->input('application_qualification'), true);
        $applicationExperience = json_decode($request->input('application_experience'), true);
        try {
            $validation = Validator::make($payload, [
                'announcement_id' => 'required',
                'user_id' => 'required',
                'apply_date' => 'required'
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

            $announcement = Announcement::find($payload['announcement_id']);

            $newRecord = Application::create(
                formatRequestData($payload)
            );

            if($newRecord){
                $applicationId = $newRecord->APPLICATION_ID;

                foreach ($applicationQualification as $qualification) {
                    $qualification['APPLICATION_ID'] = $applicationId;
                    ApplicationQualification::create($qualification);
                }

                foreach ($applicationExperience as $experience) {
                    $experience['APPLICATION_ID'] = $applicationId;
                    ApplicationExperience::create($experience);
                }

                if(!is_null($announcement->APPLICATION_FEE)){
                    $applicationURL = url('pdf/'. base64_encode($applicationId));
                    Application::find($applicationId)->update([
                        'APPLICATION_STATUS' => 2,
                        'APPLICATION_URL' => $applicationURL,
                    ]);
                    return response()->json([
                        'status' => true,
                        'redirect_url' => $applicationURL,
                    ], 200);
                }

                return response()->json([
                    'status' => true,
                    'data' => $newRecord,
                    'message' => 'Application created successfully'
                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'Application creation failed'
            ], 401);

        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function applicationRequirements(Request $request){
        $user = User::with('qualifications')->find($request->user_id);

        $announcement = Announcement::find($request->announcement_id);

        if(strtotime($announcement->END_DATE) < strtotime(Carbon::now()->format('Y-m-d'))){
            if(Application::where('USER_ID', $request->user_id)->where('ANNOUNCEMENT_ID', $request->announcement_id)->exists()){
                return response()->json([
                    'status' => false,
                    'error_message' => 'You have already applied for this job'
                ], 403);
            }else {
                return response()->json([
                    'status' => false,
                    'error_message' => 'Announcement expired.'
                ], 403);
            }
        }

        if($user->profile_completeness != 100){
            return response()->json([
                'status' => false,
                'error_message' => 'Please complete your profile before applying for this job.'
            ], 403);
        }

        if($user->qualification_completeness != 100){
            return response()->json([
                'status' => false,
                'error_message' => 'Please complete your qualification before applying for this job.'
            ], 403);
        }

        if(Application::where('USER_ID', $request->user_id)->where('ANNOUNCEMENT_ID', $request->announcement_id)->exists()){
            return response()->json([
                'status' => false,
                'error_message' => 'You have already applied for this job'
            ], 403);
        }

        if(!$announcement->checkAge($user->getAge($announcement->END_DATE))){
            return response()->json([
                'status' => false,
                'error_message' => "You age doesn't meet this job requirement"
            ], 403);
        }

        if (!$announcement->checkQualifications($user->qualifications->toArray())){
            return response()->json([
                'status' => false,
                'error_message' => "Your qualification doesn't meet this job requirement"
            ], 403);
        }

        if($announcement->EXPERIENCE_YEARS > 0){
            if($user->experience_completeness != 100){
                return response()->json([
                    'status' => false,
                    'error_message' => "You don't have the required experience for this job."
                ], 403);
            }

            if(!$announcement->checkExperience($user->getTotalExperience())){
                return response()->json([
                    'status' => false,
                    'error_message' => "Your experience doesn't meet this job requirement"
                ], 403);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'You are eligible for this job'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if(is_null($id)){
            return response()->json([
                'status' => false,
                'message' => 'id is required'
            ], 404);
        }

        $record = Application::find($id);

        if(is_null($record)){
            return response()->json([
                'status' => false,
                'message' => 'Record not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $record,
            'message' => 'Record retrieved successfully'
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            if(is_null($id)){
                return response()->json([
                    'status' => false,
                    'message' => 'id is required'
                ], 404);
            }

            $record = Application::find($id);

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            $validation = Validator::make(request()->all(), [
                'announcement_id' => 'required',
                'apply_date' => 'required'
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

            $newRecord = $record->update(
                formatRequestData($request->all())
            );

            if($newRecord){
                return response()->json([
                    'status' => true,
                    'data' => $record,
                    'message' => 'Application updated successfully'
                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'Application updation failed'
            ], 401);

        }catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            if(is_null($id)){
                return response()->json([
                    'status' => false,
                    'message' => 'id is required'
                ], 404);
            }

            $record = Application::find($id);

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'message' => 'Application not found'
                ], 404);
            }

            if($record->delete()){
                return response()->json([
                    'status' => true,
                    'message' => 'Application deleted successfully'
                ]);
            }
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getByUserId(string $id){
        try{
            $record = Application::with(['announcement.qualification_requirements.degree', 'announcement.department'])->with('application_status')->where('USER_ID', $id)->orderBy('APPLICATION_ID', 'desc')->get();

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'data' => $record,
                'message' => 'Record retrieved successfully'
            ], 200);
        }
        catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyChallan($applicationId){
//        dd($applicationId);
        try {
            $sectionAccountId = env('SECTION_ACCOUNT_ID');
            $typeCode = env('TYPE_CODE');
            $application = Application::find($applicationId);
            $challan_no = sprintf("%07d", $applicationId);
            $_param = array (
//        'p_ConsumerNumber'=> "530000533",
//        'p_ConsumerNumber'=> "212530416",
                'p_ConsumerNumber'=> env('SECTION_ACCOUNT_ID') . $challan_no,

                'p_UserName'=> env('PAYMENT_VERIFY_USERNAME'),
                'p_Password'=> env('PAYMENT_VERIFY_PASSWORD')
            );

            $data = postCURL(env('PAYMENT_VERIFY_API'), $_param);
//            dd($data);
            if($data['response_code'] == 200) {
                $challanData = json_decode($data['response'], true);
//                dd($challanData);
//                p_PaidDate":null,"p_PaidAmount":null,"p_Channel":null

                if($challanData['p_IsPaid'] == 1  && $challanData['p_PaidAmount'] >= $application->announcement->APPLICATION_FEE) {
                    $application->update(
                        ['APPLICATION_STATUS' => 1, 'PAID_AMOUNT' => $challanData['p_PaidAmount'],
                            'PAID_DATE' => $challanData['p_PaidDate'],
                            'CHANNEL' => $challanData['p_Channel']
                        ],
                    );
                return response()->json([
                    'status' => true,
                    'message' => 'Challan verified successfully',
                    'data' => json_decode($data['response'])
                ], 200);
                }
                else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Fees not verified!',
                        'data' => json_decode($data['response'])
                    ], 200);
                }

            }
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request)
    {
        try {
            $validation = Validator::make(request()->all(), [
                'application_id' => 'required',
                'application_status' => 'required'
            ]);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateUserApplicationData(Request $request, $id){
        $application = Application::find($id);
//        return response()->json($application);

        try {
            if($application){
                DB::beginTransaction(); // Start DB transaction
//                return response()->json($request->all());
                $application->update($request->all());
            }
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Application updated successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getApplicationsByAnnouncementId($announcementId)
    {
        try {
            $records = Application::where('ANNOUNCEMENT_ID', $announcementId)->get();
            return response()->json($records, 200);
        }
        catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
