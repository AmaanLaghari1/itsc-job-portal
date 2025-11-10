<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ApplicationExperience;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ApplicationExperienceController extends Controller
{
    //
    public function getUserApplicationExperience($id){
        try {
            $record = ApplicationExperience::where('APPLICATION_ID', $id)->get();

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'error_message' => 'Experience not found!'
                ]);
            }

            return response()->json([
                'status' => true,
                'data' => $record
            ],
            200);

        } catch (\Exception $e) {
            //throw $th;
            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ]);
        }
    }

    public function updateUserApplicationExperience(Request $request, $id){
        try {
            if(is_null($id)){
                return response()->json([
                    'status' => false,
                    'error_message' => 'Experience not found!'
                ], 404);
            }

            $record = ApplicationExperience::find($id);

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'error_message' => 'Experience not found!'
                ], 404);
            }

            $updated = $record->update($request->all());
            if($updated){
                return response()->json([
                    'status' => true,
                    'message' => 'Experience updated successfully...',
                ], 200);
            }
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }
}
