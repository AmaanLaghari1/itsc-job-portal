<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $allRecords = Announcement::with('program')->orderBy('ANNOUNCEMENT_ID', 'desc')->get();

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
                'position_name' => 'required',
                'dept_name' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'experience_years' => 'nullable|integer',
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

            $data = formatRequestData($request->all());

            $newRecord = Announcement::create($data);

            if($newRecord){
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

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            $validation = Validator::make(request()->all(), [
                'position_name' => 'required',
                'dept_name' => 'required',
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

            $data = formatRequestData($request->all());

            $newRecord = $record->update($data);

            if($newRecord){
                return response()->json([
                    'status' => true,
                    'data' => $record,
                    'message' => 'Announcement updated successfully'
                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'Failed to update the announcement'
            ], 500);

        }catch (\Exception $e){
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

}
