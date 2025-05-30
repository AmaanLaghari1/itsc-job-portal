<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $allRecords = Application::with('announcement')->get();

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
        try {
            $validation = Validator::make(request()->all(), [
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

            $user = User::with('qualifications')->find($request->user_id);

            $announcement = Announcement::find($request->announcement_id);

            if(!$announcement->checkAge($user->getAge($announcement->END_DATE))){
                return response()->json([
                    'status' => false,
                    'error_message' => 'You are not eligible for this job'
                ], 403);
            }

            if(Application::where('USER_ID', $request->user_id)->where('ANNOUNCEMENT_ID', $request->announcement_id)->exists()){
                return response()->json([
                    'status' => false,
                    'error_message' => 'You already applied for this job'
                ], 403);
            }

            if (!$announcement->checkQualifications($user->qualifications->toArray())){
                return response()->json([
                    'status' => false,
                    'error_message' => "Your qualification doesn't match this job requirement"
                ], 403);
            }

            $newRecord = Application::create(
                formatRequestData($request->all())
            );

            if($newRecord){
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
            $record = Application::with('announcement')->where('USER_ID', $id)->get();

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
}
