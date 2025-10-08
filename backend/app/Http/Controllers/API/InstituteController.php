<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Institute;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class InstituteController extends Controller
{
    //
    public function index(){
        try {
            $institutes = Institute::all();

            return response()->json($institutes, 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch institutes.',
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function create(Request $request){
        $validation = Validator::make($request->all(), [
            'institute_name' => 'required',
            'institute_type_id' => 'required',
        ]);

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'error_message' => $validation->errors()->first()
            ], 400);
        }

        try {
            DB::beginTransaction();
            $newRecord = Institute::create(formatRequestData($request->all()));

            if($newRecord){
                DB::commit();
                return response()->json([
                    'status' => true,
                    'message' => 'Institute added successfully.',
                    'data' => $newRecord
                ]);
            }
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Failed to add the institute.',
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id){
        $validation = Validator::make($request->all(), [
            'institute_name' => 'required',
            'institute_type_id' => 'required',
        ]);

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'error_message' => $validation->errors()->first()
            ], 400);
        }

        try {
            $record = Institute::find($id);

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found.'
                ], 200);
            }

            $requestData = formatRequestData($request->all());

            DB::beginTransaction();
            $record->update($requestData);
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Institute updated successfully.',
                'data' => $record
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Failed to update the institute.',
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function getInstTypes(){
        $records = DB::table('institute_type')->get();

        return response()->json($records, 200);
    }
}
