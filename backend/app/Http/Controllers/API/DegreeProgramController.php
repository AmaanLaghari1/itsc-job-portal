<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use PharIo\Version\Exception;

class DegreeProgramController extends Controller
{
    //
    public function index(){
        try {
            $records = DB::table('degree_programs')->get();
            return response()->json([
                'status' => true,
                'data' => $records,
                'message' => 'All records retrieved.'
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getDisciplineByProgramId($programId){
        try {
            $records = DB::table('discipline')->where('DEGREE_ID', $programId)->get();
            return response()->json([
                'status' => true,
                'data' => $records,
                'message' => 'All records retrieved.'
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function createDiscipline(Request $request){
        $validation = Validator::make($request->all(), [
            'degree_id' => 'required',
            'discipline_name' => [
                'required',
                Rule::unique('discipline')->where(function ($query) use ($request) {
                    return $query->where('DEGREE_ID', $request->degree_id);
                })
            ]
        ]);

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'error_message' => $validation->errors()->first()
            ], 400);
        }

        $data = [
          'DEGREE_ID' => $request->degree_id,
          'DISCIPLINE_NAME' => $request->discipline_name,
          'ACTIVE' => 1
        ];

        try {
            DB::beginTransaction(); // Start DB transaction

            $newRecord = Discipline::create($data);

            if($newRecord){
                DB::commit();
                return response()->json([
                    'status' => true,
                    'message' => 'Discipline added successfully.',
                    'data' => $newRecord
                ], 200);
            }
        } catch (\Exception $e){
            DB::rollBack(); // Undo changes on error

            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateDiscipline(Request $request, $id){
        $validation = Validator::make($request->all(), [
            'discipline_name' => 'required'
        ]);

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'error_message' => $validation->errors()->first()
            ], 400);
        }

        try {
            $record = Discipline::find($id);

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found.'
                ], 404);
            }

            $requestData = [
                'DISCIPLINE_NAME' => $request->discipline_name
            ];

            DB::beginTransaction();
            $record->update($requestData);
            DB::commit();

            return response()->json([
               'status' => true,
               'message' => 'Discipline updated successfully.',
            ], 200);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateDisciplineStatus(Request $request, $id){
        $validation = Validator::make($request->all(), [
            'active' => 'required|in:0,1'
        ]);

        $record = Discipline::find($id);

        DB::beginTransaction();
        $record->update(['ACTIVE' => $request->active]);
        DB::commit();
        return response()->json([
            'status' => true,
            'message' => 'Discipline status updated successfully.',
        ], 200);
    }
}
