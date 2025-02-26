<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

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
        EmailVerification::where('email', $request->email)
            ->where('created_at', '<', Carbon::now()->subMinutes(5))
            ->delete();

//        if(true){
        if($this->sendOtpCode($request->email, $verificationToken)){
            EmailVerification::updateOrCreate(
                ['email' => $request->email],
                ['token' => $verificationToken, 'data' => json_encode($requestData), 'created_at' => now()]
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

        if ($user && Hash::check($request->password, $user->PASSWORD)) {
            Auth::login($user); // Manually log in the user
            return response()->json([
                "status" => true,
                "message" => "You've logged in successfully.",
                "token" => $user->createToken("Auth Token")->plainTextToken,
                "token_type" => "bearer",
                "user" => $user
            ], 200);
        }

        return response()->json(["status" => false, "error_message" => "Invalid Credentials."], 401);
    }

    public function logout(Request $request)
    {
        \Log::info('Logout Attempt', [
            'token' => $request->header('Authorization'),
            'user' => $request->user()
        ]);

        if (!$request->user()) {
            return response()->json(['status' => false, 'message' => 'User not authenticated'], 401);
        }

        $request->user()->currentAccessToken()->delete();

        return response()->json(['status' => true, 'message' => 'Successfully logged out'], 200);
    }


    public function changePassword(){

    }

    private function postRequest($url, $params, $method = "POST")
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

        $response = $this->postRequest('https://itsc.usindh.edu.pk/sac/api/send_email_message', $param);
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

        $existingOtp = EmailVerification::where('email', $request->email)->first();

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
                ['email' => $request->email],
                ['token' => $verificationToken, 'created_at' => now()]
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

        $verification = EmailVerification::where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$verification) {
            return response()->json(["status" => false, "message" => "Invalid OTP"], 401);
        }

//        $expiry = Carbon::parse($verification->created_at)->diffInMinutes(now());


        $expiryTime = $verification->updated_at->addMinutes(5); // Assuming 30 minutes expiry
        if (now()->greaterThan($expiryTime)) {
            // Verification has expired
            return response()->json(["status" => false, "message" => "OTP expired. Please request a new one"], 401);
        }

//        if($expiry > 5){
//            return response()->json(["status" => false, "message" => "OTP expired. Please request a new one"], 401);
//        }

        // Convert stored JSON data into array
        $userData = json_decode($verification->data, true);

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
            "user" => $user
        ], 200);
    }
}
