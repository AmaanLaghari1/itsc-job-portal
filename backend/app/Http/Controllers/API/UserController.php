<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserLog;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::with(['user_roles.role'])->get();

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
//            $role = UserRoleRelation::create(['role_id' => $request->role, 'user_id' => $newUser->id]);
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
        $user = User::with('user_roles.role')->find($id);

        if($user){
            return response()->json([
                'status' => true,
                'message' => 'User found successfully.',
                'data' => $user,
                'age' => $user->getAge('2025-05-26')
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

//    public function uploadImg(Request $request)
//    {
//        $validation = Validator::make($request->all(), [
//            "profile_image" => "nullable|image|mimes:jpg,jpeg,png|max:2048",
//        ]);
//
//        if ($validation->fails()) {
//            return response()->json(['errors' => $validation->errors()], 422);
//        }
//
//        try {
//            if ($request->hasFile('file')) {
//                $file = $request->file('file');
//                $path = Storage::disk('uploads_external')->put('profile_images', $file);
//
//                return response()->json([
//                    'message' => 'File uploaded successfully!',
//                    'path' => $path
//                ]);
//            } else {
//                return response()->json(['error' => 'No file uploaded'], 400);
//            }
//        } catch (\Exception $e) {
//            return response()->json([
//                'error' => 'Upload failed',
//                'error_message' => $e->getMessage()
//            ], 500);
//        }
//    }


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
        if(is_null($request->profile_image)){
            $user->update(formatRequestData($request->except(['PROFILE_IMAGE'])));
        }
        else {
            $user->update(formatRequestData($request->all()));
        }

        UserLog::updateOrCreate(
            ['USER_ID' => $user->USER_ID],
            [
                'USER_DATA' => json_encode($user),
                'CREATED_AT' => Carbon::now()
            ]
        );

        return response()->json([
            'status' => true,
            'message' => 'User updated successfully.',
            'data' => $user,
            'profile_completeness' => $user->profile_completeness
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

    public function getDistricts($provinceId=null){
        try {
            if($provinceId){
                $options = DB::table('districts')->where('PROVINCE_ID', $provinceId)->get();
            }
            else {
                $options = DB::table('districts')->get();
            }
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

    public function getProvinces($countryId=null){
        try {
            if($countryId){
                $options = DB::table('provinces')->where('COUNTRY_ID', $countryId)->get();
            }
            else {
                $options = DB::table('provinces')->get();
            }

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

    public function getCountries($countryId=null){
        try {
            $options = DB::table('countries')->get();

            if (!is_null($countryId)){
                $options = DB::table('countries')->where('COUNTRY_ID', $countryId)->get();
            }

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

    public function getUserDetails($countryId, $provinceId=null, $districtId=null, $cityId=null){
        $country = DB::table('countries')->where('COUNTRY_ID', $countryId)->get();
        $data['country'] = $country;

        if(!is_null($provinceId)){
            $province = DB::table('provinces')->where('PROVINCE_ID', $provinceId)->get();
            $data['province'] = $province;
        }
        if(!is_null($districtId)){
            $district = DB::table('districts')->where('DISTRICT_ID', $districtId)->get();
            $data['district'] = $district;
        }
        if(!is_null($cityId)){
            $city = DB::table('cities')->where('CITY_ID', $cityId)->get();
            $data['city'] = $city;
        }

        return response()->json([
            'data' => $data
        ], 200);
    }
}
