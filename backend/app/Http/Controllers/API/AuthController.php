<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\Qualification;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    //
    public function register(Request $request){
        $validation = Validator::make(
            $request->all(),
            [
                "email" => "required|unique:users_reg,email",
                'password' => 'required|min:6|confirmed',
                'password_confirmation' => 'required|min:6',
                "cnic_no" => "required|unique:users_reg,cnic_no",
                "first_name" => "required",
                "fname" => "required",
            ]
        );

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "error_message" => $validation->errors()->first()
                ],
                401
            );
        }

        $requestData = formatRequestData($request->all());
        $verificationToken = rand(100000, 999999);

        // Check if OTP exists and delete if expired (after 5 minutes)
        EmailVerification::where('EMAIL', $request->email)
            ->where('created_at', '<', Carbon::now()->subMinutes(5))
            ->delete();

//        if(true){
        if($this->sendOtpCode($request->email, $verificationToken)){
            EmailVerification::updateOrCreate(
                ['EMAIL' => $request->email],
                ['TOKEN' => $verificationToken, 'DATA' => json_encode($requestData), 'created_at' => now()]
            );

            return response()->json(
                [
                    "status" => true,
                    "message" => "OTP sent to your registered email.",
                ],
                200
            );
        }

        return response()->json(
            [
                "status" => false,
                "message" => "Failed to send OTP.",
            ],
            500
        );
    }

    public function login(Request $request){
        $validation = Validator::make(
            $request->all(),
            [
                "cnic_no" => "required",
                "password" => "required",
            ]
        );

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "error_message" => $validation->errors()->first()
                ],
                401
            );
        }

        $user = User::where('CNIC_NO', $request->cnic_no)->first();
//        $userExperience = Experience::where('USER_ID', $user->USER_ID)->first();

        if ($user && Hash::check($request->password, $user->PASSWORD)) {
            Auth::login($user); // Manually log in the user
            return response()->json([
                "status" => true,
                "message" => "You've logged in successfully.",
                "token" => $user->createToken("Auth Token")->plainTextToken,
                "token_type" => "bearer",
                "user" => $user,
                "profile_completeness" => $user->profile_completeness,
                "experience_completeness" => $user->experience_completeness??0,
                "qualification_completeness" => $user->qualification_completeness??0
            ], 200);
        }

        return response()->json(["status" => false, "error_message" => "Invalid Credentials."], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['status' => true, 'message' => 'Successfully logged out'], 200);
    }



    public function changePassword(Request $request){
        $validation = Validator::make(
            $request->all(),
            [
                "forget_password" => "required|exists:users_reg,FORGET_PASSWORD",
                "password" => "required|min:6|confirmed",
                "password_confirmation" => "required|min:6",
            ]
        );

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "error_message" => $validation->errors()->first()
                ],
                401
            );
        }

        $data = User::updateOrCreate(
            ['FORGET_PASSWORD' => $request->forget_password],
            ['PASSWORD' => $request->password]
        );

        if($data){
            return response()->json(
                [
                    "status" => true,
                    "message" => "Password changed successfully."
                ], 200
            );
        }

        return response()->json(
            [
                "status" => false,
                "message" => "Failed to change password."
            ], 500
        );
    }

    private function postMailRequest($url, $params, $method = "POST")
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->send($method, $url, [
            'json' => $params,
        ]);

        return [
            'response' => $response->body(),
            'response_code' => $response->status(),
        ];
    }
    public function sendOtpCode($email='', $token){
//        $code = rand(100000, 999999);
        $expiry = now()->addMinutes(5);

        $param = [
            'to' => $email,
            'subject' => 'ITSC - Email Verification Code',
            'email_body' => 'Your verification code is ' . $token,
            'sender_id' => 1,
            'reply_to' => 'info@usindh.edu.pk'
        ];

        $response = $this->postMailRequest(env('MAIL_API_URL'), $param);
        if($response['response_code'] == 200){
            return true;
        }
        return false;
    }

    // Resend OTP method
    public function resendOtpCode(Request $request){
        $request->validate([
            'email' => 'required|email|exists:email_verifications,email'
        ]);

        $existingOtp = EmailVerification::where('EMAIL', $request->email)->first();

        $expiry = Carbon::parse($existingOtp->created_at)->diffInMinutes(now());

        $expiryTime = $existingOtp->updated_at->addMinutes(5); // Assuming 30 minutes expiry
        if (now()->lessThan($expiryTime)) {
            return response()->json([
                "status" => false,
                "message" => "Please wait before requesting a new OTP."
            ], 429);
        }

        // Generate new OTP
        $verificationToken = rand(100000, 999999);
//        if(true){
        if($this->sendOtpCode($request->email, $verificationToken)){
            EmailVerification::updateOrCreate(
                ['EMAIL' => $request->email],
                ['TOKEN' => $verificationToken, 'created_at' => now()]
            );


            return response()->json([
                "status" => true,
                "message" => "A new OTP has been sent."
            ], 200);
        }

        return response()->json(
            [
                "status" => false,
                "message" => "Failed to send OTP.",
            ],
            500
        );
    }

    public function verifyEmail(Request $request){
        $validation = Validator::make(
            $request->all(),
            [
                "token" => "required",
                "email" => "required"
            ]
        );

        if($validation->stopOnFirstFailure()->fails()){
            return response()->json(
                [
                    "status" => false,
                    "message" => "Validation failed.",
                    "error_message" => $validation->errors()->first()
                ],
                401
            );
        }

        $verification = EmailVerification::where('EMAIL', $request->email)
            ->where('TOKEN', $request->token)
            ->first();

        if (!$verification) {
            return response()->json(["status" => false, "message" => "Invalid OTP"], 401);
        }

        $expiryTime = $verification->updated_at->addMinutes(5); // Assuming 30 minutes expiry
        if (now()->greaterThan($expiryTime)) {
            // Verification has expired
            return response()->json(["status" => false, "message" => "OTP expired. Please request a new one"], 401);
        }

        // Convert stored JSON data into array
        $userData = json_decode($verification->DATA, true);

        // Create user account
        $user = User::create($userData);
        $token = $user->createToken("Auth Token")->plainTextToken;

        // Delete verification record after successful registration
        $verification->delete();

        return response()->json([
            "status" => true,
            "message" => "Email verified. Registration successful.",
            "token" => $token,
            "token_type" => "bearer",
            "user" => $user,
            "profile_completeness" => $user->profile_completeness
        ], 200);
    }

    public function sendPasswordResetLink(Request $request)
    {
        // Validate CNIC
        $validation = Validator::make(
            $request->all(),
            [
                "cnic_no" => "required|digits:13|exists:users_reg,cnic_no",
            ]
        );

        if ($validation->fails()) {
            return response()->json([
                "status" => false,
                "message" => "Validation failed.",
                "errors" => $validation->errors()
            ], 401);
        }

        // Find user
        $user = DB::table('users_reg')->where('CNIC_NO', $request->cnic_no)->first();

        if (!$user) {
            return response()->json([
                "status" => false,
                "message" => "CNIC No. does'nt exist."
            ], 404);
        }

        // Generate Reset Token
        $token = Str::random(64);
        $expiry = Carbon::now()->addMinutes(30); // Token expires in 30 minutes

        // Store Reset Token in Database
        DB::table('users_reg')->updateOrInsert(
            ['CNIC_NO' => $request->cnic_no],
            [
                'FORGET_PASSWORD' => $token,
                'FORGET_DATE_TIME' => Carbon::now(),
            ]
        );

        // Generate Password Reset Link
        $resetLink = env('APP_URL') .'/reset-password?token=' . $token;

        $param = [
            'to' => $user->EMAIL,
            'subject' => 'Reset Password',
            'email_body' => 'Follow this link to reset your password.'. "<br/>" . $resetLink,
            'sender_id' => 1,
            'reply_to' => 'info@usindh.edu.pk'
        ];

        if($this->postMailRequest(env('MAIL_API_URL'), $param)){
            return response()->json([
                "status" => true,
                "message" => "Password reset link generated successfully.",
                "reset_link" => $resetLink
            ], 200);
        }

        return response()->json([
            "status" => true,
            "message" => "Unable to reset the password.",
        ], 500);
    }

    public function verifyPasswordToken($token){
        if(is_null($token)){
            return response()->json([
                "status" => false,
                "message" => "Invalid Token."
            ], 401);
        }

        $user = DB::table('users_reg')
            ->where('FORGET_PASSWORD', $token)
            ->first();


        if (!$user) {
            return response()->json([
                "status" => false,
                "message" => "Token expired."
            ], 401);
        }

        return response()->json([
            "status" => true,
            "message" => "Token verified successfully.",
        ], 200);
    }

    public function checkLoggedIn($token){
        if(is_null($token)){
            return response()->json([
                "status" => false,
                "message" => "Invalid Token."
            ], 401);
        }

        $user = DB::table('personal_access_tokens')
            ->where('tokenable_id', $token)
            ->first();


        if (!$user) {
            return response()->json([
                "status" => false,
                "message" => "Token expired."
            ], 401);
        }

        return response()->json([
            "status" => true,
            "message" => "Token verified successfully.",
        ], 200);
    }
}
