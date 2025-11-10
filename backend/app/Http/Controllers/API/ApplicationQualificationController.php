<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ApplicationQualification;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ApplicationQualificationController extends Controller
{
    public function getUserApplicationQualifications($id){
        try {
            $record = ApplicationQualification::where('APPLICATION_ID', $id)->with([ 'discipline'])->get();
            foreach ($record as $qualification) {
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

            $data = $record->sortByDesc(function ($item) {
                return $item->degree->DEGREE_ID;
            })
                ->values()
                ->map(function ($item) {
                    return $item;
                });

            return response()->json($data);
        }
        catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    public function updateUserApplicationQualifications(Request $request, $id)
{
    try {
        if (is_null($id)) {
            return response()->json([
                "status" => false,
                "message" => "Qualification not found"
            ], 404);
        }

        $qualification = ApplicationQualification::find($id);

        if (is_null($qualification)) {
            return response()->json([
                "status" => false,
                "message" => "Qualification not found"
            ], 404);
        }

        $updated = $qualification->update($request->all());

        if ($updated) {
            return response()->json([
                "status" => true,
                "message" => "Qualification updated successfully",
                "data" => $qualification
            ], 200);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Failed to update qualification"
            ], 400);
        }
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'Something went wrong',
            'error_message' => $e->getMessage()
        ], 500);
    }
}

}
