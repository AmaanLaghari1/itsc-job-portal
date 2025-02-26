<?php

namespace App\Http\Controllers\API;

use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserRoleRelation;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::get();

        return response()->json([
            'status' => true,
            'data' => $user,
        ] , 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validation = Validator::make(
            $request->all(),
            [
                "role" => 'required',
                "full_name" => "required",
                "surname" => "required",
                "father_name" => "required",
                "cnic_no" => "required|unique:users,cnic_no",
                "email" => "required|unique:users,email",
                "password" => "required|min:8",
            ]
        );

        if($validation->fails()){
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "data" => ["errors" => $validation->messages()],
                ],
                401
            );
        }

        $newUser = User::create(
            [
                "full_name" => $request->full_name,
                "surname" => $request->surname,
                "father_name" => $request->father_name,
                "cnic_no" => $request->cnic_no,
                "email" => $request->email,
                "password" => $request->password,
            ]
        );

        if($newUser){
            $role = UserRoleRelation::create(['role_id' => $request->role, 'user_id' => $newUser->id]);
            return response()->json([
                'status' => true,
                'message' => 'User created successfully.',
                'data' => $newUser,
            ] , 200);
        }
        else {
        return response()->json([
            'status' => false,
            'message' => 'Failed to create the user.',
            ] , 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::with('user_roles.user_role.user_privileges.user_privilege')->with('qualifications')->find($id);

        if($user){
            return response()->json([
                'status' => true,
                'message' => 'User found successfully.',
                'data' => $user,
            ] , 200);
        }
        else {
            return response()->json([
                'status' => false,
                'message' => 'No User found.',
            ] , 404);
        }
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
        // Validation
        $validation = Validator::make(
            $request->all(),
            [
//                "role" => "required",
                "full_name" => "required",
                "surname" => "required",
                "father_name" => "required",
                "cnic_no" => [
                    "required",
                    Rule::unique('users', 'cnic_no')->ignore($id),
                ],
                "email" => "required|email",
            ]
        );

        if ($validation->fails()) {
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "data" => ["errors" => $validation->messages()],
                ],
                401
            );
        }

        // Find the user by ID
        $user = User::find($id); // Using find instead of findOrFail so we can handle it more gracefully

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
            ], 404);
        }

        // Prepare data for user update
        $data = [
            "full_name" => $request->full_name,
            "surname" => $request->surname,
            "father_name" => $request->father_name,
            "cnic_no" => $request->cnic_no,
            "email" => $request->email,
            "phone_no" => $request->phone_no
        ];

        // Update user
        $result = $user->update($data);

        if ($result) {
            // Check if a role exists for this user
//            $roleExist = UserRoleRelation::where('user_id', $user->id)
//                                 ->where('role_id', $request->role) // Assuming $request->role contains the role_id
//                                 ->first();
//            if($roleExist == null){
//                UserRoleRelation::create([
//                    'user_id' => $user->id,
//                    'role_id' => $request->role,
//                ]);
//            }
            $user = User::with('user_roles.user_role.user_privileges.user_privilege')->with('qualifications')->find($id);


            // Respond with success
            return response()->json([
                'status' => true,
                'message' => 'User updated successfully.',
                'data' => $user,
            ], 200);
        } else {
            // Respond with failure
            return response()->json([
                'status' => false,
                'message' => 'Failed to update the user.',
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $user = User::find($id);

        if($user->delete()){
            return response()->json([
                'status' => true,
                'message' => 'User deleted successfully.',
                ] , 200);
            }
        else {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete the user.',
            ] , 500);
        }
    }
}
