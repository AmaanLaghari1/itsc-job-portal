<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Experience;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        try {
            $validation = Validator::make($request->all(), [
                'user_id' => 'required',
                'emp_type' => 'required',
                'organization_name' => 'required',
                'address' => 'required',
                'contact_no' => 'required',
                'start_date' => 'required',
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

            if(Experience::create($data)){
                return response()->json(
                    [
                        "status" => true,
                        "message" => "Experience added"
                    ]
                    , 200
                );
            }
        }
        catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'error_message' => $e->getMessage(),
                'data' => $data
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
        //
        try {
            $experience = Experience::find($id);

            if (empty($experience)){
                return response()->json(
                    [
                        "status" => false,
                        "message" => "User Experience not found"
                    ], 404
                );
            }

            $validation = Validator::make($request->all(), [
                'user_id' => 'required',
                'emp_type' => 'required',
                'organization_name' => 'required',
                'address' => 'required',
                'contact_no' => 'required',
                'start_date' => 'required',
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

            $newExperience = $experience->update($data);

            if($newExperience){
                return response()->json(
                    [
                        "status" => true,
                        "message" => "Experience updated",
                        "data" => $experience
                    ]
                , 200);
            }

        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'error_message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $record = Experience::find($id);

        if($record->delete()){
            return response()->json([
                'status' => true,
                'message' => 'Experience deleted successfully.',
            ] , 200);
        }
        else {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete the experience.',
            ] , 500);
        }
    }

    public function getByUserId($userId=null){
        try {
            if($userId){
                $data = Experience::where('USER_ID', $userId)->with('user')->get();
            }
            else {
                $data = DB::table('experiances')->get();
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
