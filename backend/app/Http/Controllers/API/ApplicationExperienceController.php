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
            $record = ApplicationExperience::where('APPLICATION_ID', $id)
                ->orderByDesc('EXPERIANCE_ID')
                ->get();

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

            $updated = $record->update(formatRequestData($request->all()));

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

    public function addUserApplicationExperience(Request $request){
        try {
            if(empty($request->data)){
                return response()->json([
                    'status' => false,
                    'error_message' => 'Experience cannot be empty!'
                ], 403);
            }

            DB::beginTransaction();
            $record = ApplicationExperience::create($request->data);
            DB::commit();

            return response()->json([
                'status' => true,
                'data' => $record,
                'message' => 'Experience added successfully...',
            ], 200);
        }
        catch (\Exception $e){
            DB::rollBack();
            \Log::error("Application Experience add error: " . $e->getMessage());
            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteUserApplicationExperience(Request $request){
        try {
            if(is_null($request->exp_id)){
                return response()->json([
                    'status' => false,
                    'error_message' => 'Experience not found!'
                ]);
            }

            DB::beginTransaction();
            $record = ApplicationExperience::find($request->exp_id);

            if(is_null($record)){
                return response()->json([
                    'status' => false,
                    'error_message' => 'Experience not found!'
                ]);
            }

            $record->delete();
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Experience deleted successfully...',
            ]);
        }
        catch (\Exception $e){
            \Log::error("Application Experience delete error: " . $e->getMessage());
            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }
}
