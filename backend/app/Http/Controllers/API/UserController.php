<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        $user = User::find($id);

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
//    public function update(Request $request, string $id)
//    {
//        // Find the user by ID
//        $user = User::find($id); // Using find instead of findOrFail so we can handle it more gracefully
//
//        if (!$user) {
//            return response()->json([
//                'status' => false,
//                'message' => 'User not found.',
//            ], 404);
//        }
//
//        if ($request->hasFile('profile_picture')) {
//            $original_pic = $request->file('profile_picture');
//
//            $file_extension=$original_pic->getClientOriginalExtension();
//            $filename = time() . '.' . $file_extension;
//
//            # upload original image
//            Storage::put('ArticlesImages/' . $filename, (string) file_get_contents($original_pic), 'public');
//
//            # croped image from request.
//            $image_parts = explode(";base64,", $request->input('article_image'));
//            $image_base64 = base64_decode($image_parts[1]);
//
//            Storage::put('ArticlesImages/croped/' . $filename, (string) $image_base64, 'public');
//
//            # get image from s3 or local storage.
//            $image_get = Storage::get('ArticlesImages/croped/' . $filename);
//
//            # resize 50 by 50 1x
//            $image_50_50 = Image::make($image_get)
//                ->resize(340, 227)
//                ->encode($file_extension, 80);
//
//            Storage::put('ArticlesImages/1x/' . $filename, (string) $image_50_50, 'public');
//
//            $file_url = Storage::url('ArticlesImages/croped/' . $filename);
//
//            return response()->json(['success' => true, 'filename' => $filename, 'file_url' => $file_url], 200);
//        }
//
//        // Validation
//        $validation = Validator::make(
//            $request->all(),
//            [
//                "first_name" => "required",
//                "last_name" => "required",
//                "fname" => "required",
//                "cnic_no" => [
//                    "required",
//                    Rule::unique('users_reg', 'CNIC_NO')->ignore($id, 'USER_ID'), // Ensure 'USER_ID' is correctly referenced
//                ],
//                "email" => [
//                    "required",
//                    "email",
//                    Rule::unique('users_reg', 'EMAIL')->ignore($id, 'USER_ID'),
//                ],
//            ]
//        );
//
//        if ($validation->stopOnFirstFailure()->fails()) {
//            return response()->json(
//                [
//                    "status" => false,
//                    "message" => "Validation failed.",
//                    "error_message" => $validation->errors()->first(),
//                ],
//                401
//            );
//        }
//
//        // Update user
//        $result = $user->update(formatRequestData($request->all()));
//
//        if ($result) {
//            $user = User::find($id);
//
//
//            // Respond with success
//            return response()->json([
//                'status' => true,
//                'message' => 'User updated successfully.',
//                'data' => $user,
//            ], 200);
//        } else {
//            // Respond with failure
//            return response()->json([
//                'status' => false,
//                'message' => 'Failed to update the user.',
//            ], 500);
//        }
//    }

    public function uploadImg(Request $request){
        $validation = Validator::make($request->all(), [
            "profile_image" => "nullable|image|mimes:jpg,jpeg,png|max:2048", // Ensure it's an image
        ]);
        try {

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = Storage::disk('uploads')->put('profile_images', $file);
            return response()->json(['message' => 'File uploaded successfully!', 'path' => $path]);
        }
        }
        catch (\Exception $e) {

        return response()->json(['error' => 'No file uploaded', 'error_message' => $e->getMessage()], 400);
        }

    }
    public function update(Request $request, string $id)
    {
        // Find the user
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
            ], 404);
        }

        // Validate request
        $validation = Validator::make($request->all(), [
            "first_name" => "required",
            "last_name" => "required",
            "fname" => "required",
            "cnic_no" => [
                "required",
                Rule::unique('users_reg', 'CNIC_NO')->ignore($id, 'USER_ID'),
            ],
            "email" => [
                "required",
                "email",
                Rule::unique('users_reg', 'EMAIL')->ignore($id, 'USER_ID'),
            ],
//            "profile_picture" => "nullable|image|mimes:jpg,jpeg,png|max:2048", // Ensure it's an image
        ]);

        if ($validation->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validation failed.",
                "error_message" => $validation->errors()->first(),
            ], 401);
        }

        // Update user details
        $user->update(formatRequestData($request->all()));

        return response()->json([
            'status' => true,
            'message' => 'User updated successfully.',
            'data' => $user,
        ], 200);
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

    public function getDistricts(){
        try {
            $options = DB::table('districts')->get();

            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getCities()
    {
        try {
            $options = DB::table('cities')->get();

            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getProvinces(){
        try {
            $options = DB::table('provinces')->get();

            return response()->json([
                'options' => $options,
                'status' => true
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function getCountries(){
        try {
            $options = DB::table('countries')->get();

            return response()->json([
                'options' => $options,
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
