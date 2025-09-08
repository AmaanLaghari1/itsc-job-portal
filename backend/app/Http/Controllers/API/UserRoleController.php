<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UserRoleRelation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller
{
    //
    public function assignRole(Request $request)
    {
        $validation = Validator::make(
            $request->all(),
            [
                "role_id" => "required",
                "user_id" => "required",  // Make sure user_id is also validated
            ]
        );

        if ($validation->fails()) {
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "error_message" => $validation->errors()->first(),
                ],
                401
            );
        }

        try {
            // Check if the user already has the role assigned
            $existingRole = UserRoleRelation::where('USER_ID', $request->input('user_id'))
                ->where('ROLE_ID', $request->input('role_id'))
                ->first();

            if ($existingRole) {
                return response()->json([
                    "status" => false,
                    "message" => "This role is already assigned to the user.",
                    "error_message" => "Role already exists for this user.",
                ], 400);  // Returning 400 Bad Request because it's a conflict
            }

            // Proceed to insert if no existing role assignment found
            DB::beginTransaction();

            $newRole = UserRoleRelation::create([
                "ROLE_ID" => $request->input("role_id"),
                "USER_ID" => $request->input("user_id"),
            ]);

            if ($newRole) {
                DB::commit();
                return response()->json([
                    "status" => true,
                    "message" => "Role assigned successfully.",
                    "role" => $newRole,
                ], 200);
            }

        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json([
                "status" => false,
                "error_message" => "Something went wrong.",
            ], 500);
        }
    }

    public function destroy($roleId){
        $role = UserRoleRelation::find($roleId);

        try {
            if($role->delete()){
                return response()->json([
                    'status' => true,
                    'message' => 'Role deleted successfully.',
                ], 200);
            }
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete the role.',
            ], 500);
        }
    }
}
