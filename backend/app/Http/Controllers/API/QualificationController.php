<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Qualification;

class QualificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        try {
            $validation = Validator::make($request->all(), [
                'discipline_id' => 'required',
                'user_id' => 'required',
//                'institute_id' => 'required',
//                'start_date' => 'required',
//                'end_date' => 'required',
//                'obtained_marks' => 'required',
//                'total_marks' => 'required'
            ]);

            if($validation->stopOnFirstFailure()->fails()){
                return response()->json(
                    [
                        "status" => false,
                        "message" => "Validation failed",
                        "error_message" => $validation->errors()->first()
                    ], 422);
            }

            $data = formatRequestData($request->all());
            $newQualification = Qualification::create($data);

            if($newQualification){
                $user = User::find($request->user_id);
                return response()->json(
                    [
                        "status" => true,
                        "message" => "Qualification added",
                        "qualification_completeness" => $user->qualification_completeness
                    ]
                    , 200
                );
            }
        }
        catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'error_message' => $e->getMessage()
            ], 500);
        }
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
        //
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
                    "status" => false,
                    "message" => "Qualification not found"
                ], 404);
            }

            $qualification = Qualification::find($id);

            if(is_null($qualification)){
                return response()->json(
                    [
                        "status" => false,
                        "message" => "Qualification not found"
                    ], 404
                );
            }

            $data = formatRequestData($request->all());

            if($data['IS_RESULT_DECLARE'] == 'N'){
                $data['TOTAL_MARKS'] = '';
                $data['OBTAINED_MARKS'] = '';
                $data['PASSING_YEAR'] = '';
                $data['RESULT_DATE'] = '';
                $data['GRADING_AS'] = '';
                $data['CGPA'] = NULL;
                $data['GRADE'] = '';
            }

            $newQualification = $qualification->update($data);

            if($newQualification){
                $user = User::find($request->user_id);
                return response()->json(
                    [
                        "status" => true,
                        "message" => "Qualification updated",
                        "qualification_completeness" => $user->qualification_completeness
                    ], 200
                );
            }
        }
        catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
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
            if (is_null($id)) {
                return response()->json([
                    "status" => false,
                    "message" => "Qualification not found"
                ], 404);
            }

            $record = Qualification::find($id);

            if (is_null($record)) {
                return response()->json([
                    "status" => false,
                    "message" => "Qualification not found"
                ], 404);
            }

            $userId = $record->USER_ID;
            $user = User::find($userId);

            if ($record->delete()) {
                return response()->json([
                    "status" => true,
                    "message" => "Qualification deleted",
                    "qualification_completeness" => $user->qualification_completeness
                ], 200);
            }

            return response()->json([
                "status" => false,
                "message" => "Failed to delete qualification"
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                "status" => false,
                "message" => "An error occurred",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function getPrograms($programId=null){
        try {
            $options = DB::table('degree_program')->whereNull('REMARKS')
//                    ->like('REMARKS', 'HIDE')
                    ->orderBy('DEGREE_ORDER', 'asc')
                    ->get();

            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getDisciplines($programId=null){
        try {
            if($programId){
                $options = DB::table('discipline')->where('DEGREE_ID', $programId)->where('ACTIVE', 1)
//                    ->whereNot('REMARKS', 'HIDE')
                    ->get();
            }
            else {
                $options = DB::table('discipline')->get();
            }
            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getOrganizations($organizationId=null){
        try {
            if($organizationId){
                $options = DB::table('organizations')->where('ORGANIZATION_ID', $organizationId)->get();
            }
            else {
                $options = DB::table('organizations')->get();
            }
            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getInstitutes(Request $request, $institututeId=null){
        $query = DB::table('institute');

        try {
            if($request->query('search')){
                $options = $query->where('INSTITUTE_NAME', 'like', '%'.$request->query('search') .'%')->limit(200)->get();
            }
            if($institututeId){
                $options = $query->where('INSTITUTE_ID', $institututeId)->limit(200)->get();
            }
            else {
                $options = $query->limit(200)->get();
            }
            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getByUserId($userId=null){
        try {
            if($userId){
                $data = Qualification::where('USER_ID', $userId)->with('user')->with('discipline')->get();
                foreach ($data as $qualification) {
                    $qualification->institute = DB::table('institute')
                        ->where('INSTITUTE_ID', $qualification->INSTITUTE_ID)
                        ->first();
                    $qualification->organization = DB::table('institute')
                        ->where('INSTITUTE_ID', $qualification->ORGANIZATION_ID)
                        ->first();
                    $qualification->discipline = DB::table('discipline')
                        ->where('DISCIPLINE_ID', $qualification->DISCIPLINE_ID)
                        ->first();
                    $qualification->degree = DB::table('degree_program')
                        ->where('DEGREE_ID', $qualification->discipline->DEGREE_ID)
                        ->first();
                }
            }
            else {
                $data = DB::table('qualifications')->get();
            }
            return response()->json([
                'data' => $data,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

}
