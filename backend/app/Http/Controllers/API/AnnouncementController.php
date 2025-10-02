<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\AnnouncementQualificationRequirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $allRecords = Announcement::with('program')->with('qualification_requirements.degree')->with('department')->orderBy('START_DATE', 'desc')->get();

            return response()->json([
                'status' => true,
                'data' => $allRecords,
                'message' => 'All records retrieved'
            ], 200);

        }catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $validation = Validator::make(request()->all(), [
                'announcement_title' => 'required',
                'position_name' => 'required',
                'dept_id' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'experience_years' => 'nullable|integer',
                'qualifications' => 'required'
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

//            $data = formatRequestData($request->except('qualifications'));

            $requestData = [
                'ANNOUNCEMENT_TITLE' => $request->announcement_title,
                'POSITION_NAME' => $request->position_name,
                'DEPT_ID' => $request->dept_id,
                'DESCRIPTION' => $request->description,
                'START_DATE' => $request->start_date,
                'END_DATE' => $request->end_date,
                'APPLICATION_FEE' => $request->application_fee,
                'AGE_FROM' => $request->age_from,
                'AGE_TO' => $request->age_to,
                'EXPERIENCE_YEARS' => $request->experience_years,
                'REF_NO' => $request->ref_no,
                'ACCESS_ID' => $request->access_id
            ];

//            return response()->json($requestData);

            $newRecord = Announcement::create($requestData);

            if($newRecord){
                foreach ($request->qualifications as $qualification) {
                    $newRecord = AnnouncementQualificationRequirement::create([
                        'ANNOUNCEMENT_ID' => $newRecord->ANNOUNCEMENT_ID,
                        'DEGREE_ID' => $qualification['key'],
                        'IS_REQUIRED' => $qualification['required'],
                    ]);
                }

                return response()->json([
                    'status' => true,
                    'data' => $newRecord,
                    'message' => 'Announcement created successfully'
                ], 200);
            }

        }catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return 0;
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

        $record = Announcement::find($id);

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
    public function update(Request $request, string $id)
    {
        try {
            $record = Announcement::find($id);

            if (is_null($record)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            $validation = Validator::make($request->all(), [
                'announcement_title' => 'required',
                'position_name' => 'required',
                'dept_id' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

            DB::beginTransaction(); // Start DB transaction

//            $data = formatRequestData($request->except(['qualifications', 'qual_req_data']));
            $requestData = [
                'ANNOUNCEMENT_TITLE' => $request->announcement_title,
                'POSITION_NAME' => $request->position_name,
                'DEPT_ID' => $request->dept_id,
                'DESCRIPTION' => $request->description,
                'START_DATE' => $request->start_date,
                'END_DATE' => $request->end_date,
                'APPLICATION_FEE' => $request->application_fee,
                'AGE_FROM' => $request->age_from,
                'AGE_TO' => $request->age_to,
                'EXPERIENCE_YEARS' => $request->experience_years,
                'REF_NO' => $request->ref_no,
                'ACCESS_ID' => $request->access_id
            ];

            dd($requestData);

            $record->update($requestData); // Update main announcement

            $qualifications = $request->qualifications ?? [];
            $previousData = $request->qual_req_data ?? [];

            $existingReqIds = [];

// Step 1: Convert previous data to DEGREE_ID => [data] map
            $prevMap = collect($previousData)->keyBy('DEGREE_ID');

// Step 2: Loop through current qualifications (from checkboxes)
            foreach ($qualifications as $q) {
                $degreeId = $q['key'];
                $isRequired = $q['required'];

                if ($prevMap->has($degreeId)) {
                    // ✅ Update existing
                    $prev = $prevMap[$degreeId];

                    $record = AnnouncementQualificationRequirement::find($prev['REQ_ID']);
                    if ($record) {
                        $record->update([
                            'IS_REQUIRED' => $isRequired,
                        ]);
                        $existingReqIds[] = $record->REQ_ID;
                    }
                } else {
                    // ✅ Create new
                    $new = AnnouncementQualificationRequirement::create([
                        'ANNOUNCEMENT_ID' => $record->ANNOUNCEMENT_ID,
                        'DEGREE_ID' => $degreeId,
                        'IS_REQUIRED' => $isRequired,
                    ]);
                    $existingReqIds[] = $new->REQ_ID;
                }
            }

// Step 3: Delete any qualifications that were removed
            AnnouncementQualificationRequirement::where('ANNOUNCEMENT_ID', $record->ANNOUNCEMENT_ID)
                ->whereNotIn('REQ_ID', $existingReqIds)
                ->delete();

            DB::commit(); // All done

            return response()->json([
                'status' => true,
                'data' => $record->fresh(),
                'message' => 'Announcement updated successfully'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack(); // Undo changes on error

            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $record = Announcement::find($id);

            if($record->delete()){
                return response()->json([
                    'status' => true,
                    'message' => 'Announcement deleted successfully'
                ], 200);
            }
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function getRecentAnnouncements($cutoff=null)
    {
        try {
            if($cutoff){
                $cutoffDate = Carbon::now()->subMonths($cutoff); // 6 months from today
            }
            else {
                $cutoffDate = Carbon::now()->subDays(25); // 14 days from today
            }

            $records = Announcement::with([
                'program',
                'qualification_requirements.degree',
                'department'
            ])
                ->where('END_DATE', '>=', $cutoffDate)
                ->orderBy('START_DATE', 'desc')
//                ->take(5)
                ->get();

            return response()->json($records, 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

}
