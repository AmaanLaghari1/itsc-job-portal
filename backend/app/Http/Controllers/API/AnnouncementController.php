<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\AnnouncementQualificationRequirement;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $allRecords = Cache::remember('announcements_all', 60, function () {
                return Announcement::with(['program', 'qualification_requirements.degree', 'department'])
                    ->latestWithExpiredLast()
                    ->get();
            });

            return response()->json([
                'status' => true,
                'data' => $allRecords,
                'message' => 'All records retrieved'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $validation = Validator::make(request()->all(), [
                'announcement_title' => 'required',
                'position_name' => 'required',
                'dept_id' => 'required',
                'description' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'experience_years' => 'nullable|integer',
                'qualifications' => 'required'
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

//            $data = formatRequestData($request->except('qualifications'));

            $requestData = [
                'ANNOUNCEMENT_TITLE' => $request->announcement_title,
                'POSITION_NAME' => $request->position_name,
                'DEPT_ID' => $request->dept_id,
                'DESCRIPTION' => $request->description,
                'START_DATE' => $request->start_date,
                'END_DATE' => $request->end_date,
                'APPLICATION_FEE' => $request->application_fee,
                'AGE_FROM' => $request->age_from,
                'AGE_TO' => $request->age_to,
                'EXPERIENCE_YEARS' => $request->experience_years,
                'REF_NO' => $request->ref_no,
                'ACCESS_ID' => $request->access_id,
                'ACTIVE' => $request->active
            ];

//            return response()->json($requestData);

            $newRecord = Announcement::create($requestData);

            if($newRecord){
                foreach ($request->qualifications as $qualification) {
                    $newRecord = AnnouncementQualificationRequirement::create([
                        'ANNOUNCEMENT_ID' => $newRecord->ANNOUNCEMENT_ID,
                        'DEGREE_ID' => $qualification['key'],
                        'IS_REQUIRED' => $qualification['required'],
                    ]);
                }

                return response()->json([
                    'status' => true,
                    'data' => $newRecord,
                    'message' => 'Announcement created successfully'
                ], 200);
            }

        }catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return 0;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if(is_null($id)){
            return response()->json([
                'status' => false,
                'message' => 'id is required'
            ], 404);
        }

        $record = Announcement::find($id);

        if(is_null($record)){
            return response()->json([
                'status' => false,
                'message' => 'Record not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $record,
            'message' => 'Record retrieved successfully'
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, string $id)
    {
        try {
            $record = Announcement::find($id);

            if (is_null($record)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Record not found'
                ], 404);
            }

            $validation = Validator::make($request->all(), [
                'announcement_title' => 'required',
                'position_name' => 'required',
                'dept_id' => 'required',
                'description' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
                'experience_years' => 'nullable|integer',
                'qualifications' => 'required'
            ]);

            if ($validation->stopOnFirstFailure()->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 401);
            }

            DB::beginTransaction(); // Start DB transaction

//            $data = formatRequestData($request->except(['qualifications', 'qual_req_data']));
            $requestData = [
                'ANNOUNCEMENT_TITLE' => $request->announcement_title,
                'POSITION_NAME' => $request->position_name,
                'DEPT_ID' => $request->dept_id,
                'DESCRIPTION' => $request->description,
                'START_DATE' => $request->start_date,
                'END_DATE' => $request->end_date,
                'APPLICATION_FEE' => $request->application_fee,
                'AGE_FROM' => $request->age_from,
                'AGE_TO' => $request->age_to,
                'EXPERIENCE_YEARS' => $request->experience_years,
                'REF_NO' => $request->ref_no,
                'ACCESS_ID' => $request->access_id,
                'ACTIVE' => $request->active,
            ];

//            dd($requestData);

            $record->update($requestData); // Update main announcement

            $qualifications = $request->qualifications ?? [];
            $previousData = $request->qual_req_data ?? [];

            $existingReqIds = [];

// Step 1: Convert previous data to DEGREE_ID => [data] map
            $prevMap = collect($previousData)->keyBy('DEGREE_ID');

// Step 2: Loop through current qualifications (from checkboxes)
            foreach ($qualifications as $q) {
                $degreeId = $q['key'];
                $isRequired = $q['required'];

                if ($prevMap->has($degreeId)) {
                    // Update existing
                    $prev = $prevMap[$degreeId];

                    $record = AnnouncementQualificationRequirement::find($prev['REQ_ID']);
                    if ($record) {
                        $record->update([
                            'IS_REQUIRED' => $isRequired,
                        ]);
                        $existingReqIds[] = $record->REQ_ID;
                    }
                } else {
                    $new = AnnouncementQualificationRequirement::create([
                        'ANNOUNCEMENT_ID' => $record->ANNOUNCEMENT_ID,
                        'DEGREE_ID' => $degreeId,
                        'IS_REQUIRED' => $isRequired,
                    ]);
                    $existingReqIds[] = $new->REQ_ID;
                }
            }

// Step 3: Delete any qualifications that were removed
            AnnouncementQualificationRequirement::where('ANNOUNCEMENT_ID', $record->ANNOUNCEMENT_ID)
                ->whereNotIn('REQ_ID', $existingReqIds)
                ->delete();

            DB::commit(); // All done

            return response()->json([
                'status' => true,
                'data' => $record->fresh(),
                'message' => 'Announcement updated successfully'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack(); // Undo changes on error

            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $record = Announcement::find($id);

            if($record->delete()){
                return response()->json([
                    'status' => true,
                    'message' => 'Announcement deleted successfully'
                ], 200);
            }
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function getRecentAnnouncements($cutoff=null)
    {
        try {
            if($cutoff){
                $cutoffDate = Carbon::now()->subMonths($cutoff); // 6 months from today
            }
            else {
                $cutoffDate = Carbon::now()->subDays(25); // 25 days from today
            }

            $records = Announcement::with([
                'program',
                'qualification_requirements.degree',
                'department'
            ])
                ->where('END_DATE', '>=', $cutoffDate)
                ->orderBy('START_DATE', 'desc')
//                ->take(5)
                ->get();

            return response()->json($records, 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generateReport(Request $request){
        try {
            $announcementIds = $request->announcement_ids ?? [];
            $report = DB::table('announcements as a')
                ->leftJoin('applications as app', 'a.ANNOUNCEMENT_ID', '=', 'app.ANNOUNCEMENT_ID')
                ->select(
                    'a.ANNOUNCEMENT_TITLE',
                    DB::raw('COUNT(app.APPLICATION_ID) AS TOTAL_APPLICANTS'),
                    DB::raw('COUNT(CASE WHEN app.PAID_DATE IS NOT NULL THEN 1 END) AS PAID_APPLICANTS'),
                    DB::raw('COUNT(CASE WHEN app.PAID_DATE IS NULL THEN 1 END) AS UNPAID_APPLICANTS'),
                    DB::raw('SUM(CASE WHEN app.PAID_DATE IS NOT NULL THEN a.APPLICATION_FEE ELSE 0 END) AS PAID_AMOUNT')
                )
                ->when(!empty($announcementIds), function ($query) use ($announcementIds) {
                    $query->whereIn('a.ANNOUNCEMENT_ID', $announcementIds);
                })
                ->groupBy('a.ANNOUNCEMENT_TITLE')
                ->orderBy('a.ANNOUNCEMENT_TITLE')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $report
            ]);
        }
        catch (\Exception $e) {
            return response()->json([
                'error_message' => $e->getMessage()
            ], 500);
        }

    }

    public function downloadApplicationsReport(Request $request, PdfService $pdfService)
    {
        try {

            $validation = Validator::make($request->all(), [
                'announcement_ids' => 'required',
                'announcement_ids.*' => 'integer'
            ])->stopOnFirstFailure();

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validation->errors()->first()
                ], 422);
            }

            $announcementIds = $request->announcement_ids;

            // Generate PDF
            $pdfContent = $pdfService->generateReportPdf($announcementIds);

            // Return file as download
            return response($pdfContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="applications-report.pdf"'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function downloadApplicationExperienceReport(Request $request, PdfService $pdfService)
    {
        try {

            $validation = Validator::make($request->all(), [
                'announcement_ids' => 'required',
                'announcement_ids.*' => 'integer'
            ])->stopOnFirstFailure();

            if ($validation->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validation->errors()->first()
                ], 422);
            }

            $announcementIds = $request->announcement_ids;

            // Generate PDF
            $pdfContent = $pdfService->generateExperienceReportPdf($announcementIds);

            // Return file as download
            return response($pdfContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="applications-report.pdf"'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error_message' => $e->getMessage()
            ], 500);
        }
    }

    public function downloadCandidatesReport(Request $request, PdfService $pdfService)
    {
        try {
            $validation = Validator::make($request->all(), [
                'announcement_ids' => 'required',
                'announcement_ids.*' => 'integer'
            ])->stopOnFirstFailure();

            if($validation->fails()){
                return response()->json([
                    'status' => 'error',
                    'errors' => $validation->errors()->first()
                ], 401);
            }

            $announcementIds = $request->announcement_ids;

            $pdfContent = $pdfService->generateCandidateReportPdf($announcementIds);

            return response($pdfContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="candidate-report.pdf"'
            ], 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function assignUserToAnnouncement(Request $request)
    {
        try {
            $validation = Validator::make(
                $request->all(),
                [
                    'announcement_ids'   => 'required|array|min:1',
                    'announcement_ids.*' => 'required|integer|exists:announcements,ANNOUNCEMENT_ID',
                    'user_id'            => 'required|integer|exists:users_reg,USER_ID',
                ],
                [
                    'announcement_ids.required' => 'Please select at least one announcement.',
                    'announcement_ids.array'    => 'Announcements must be an array.',
                    'user_id.required'          => 'User is required.',
                ]
            )->stopOnFirstFailure();

            if ($validation->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 422);
            }

            DB::beginTransaction();

            $announcementIds = $request->announcement_ids;
            $userId = $request->user_id;

            // Get already assigned announcements
            $existingAssignments = DB::table('announcement_user_relations')
                ->where('USER_ID', $userId)
                ->whereIn('ANNOUNCEMENT_ID', $announcementIds)
                ->pluck('ANNOUNCEMENT_ID')
                ->toArray();

            // Prepare new records only
            $insertData = [];

            foreach ($announcementIds as $announcementId) {
                if (!in_array($announcementId, $existingAssignments)) {
                    $insertData[] = [
                        'ANNOUNCEMENT_ID' => $announcementId,
                        'USER_ID' => $userId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            if (!empty($insertData)) {
                DB::table('announcement_user_relations')->insert($insertData);
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'inserted_count' => count($insertData),
                'skipped_count' => count($existingAssignments),
                'message' => 'Announcements assigned successfully.'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Announcement Assign Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'Something went wrong.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUserAssignedAnnouncements(Request $request){
        try {
            $validation = Validator::make($request->all(), [
                'user_id' => 'required|integer|exists:users_reg,USER_ID',
            ])->stopOnFirstFailure();

            if($validation->fails()){
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $records = DB::table('announcement_user_relations as aur')
                ->join('announcements as a', 'a.ANNOUNCEMENT_ID', '=', 'aur.ANNOUNCEMENT_ID')
                ->where('aur.USER_ID', $request->user_id)
                ->select(
                    'a.ANNOUNCEMENT_ID',
                    'a.ANNOUNCEMENT_TITLE',
                    'aur.REL_ID'
                )
                ->orderByDesc('aur.REL_ID')
                ->get();

            return response()->json($records, 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function deleteUserAssignedAnnouncement(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'announcement_ids' => 'required|array|min:1',
                'announcement_ids.*' => 'required|integer',
                'user_id' => 'required|integer|exists:users_reg,USER_ID',
            ])->stopOnFirstFailure();

            if ($validation->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 422);
            }

            DB::beginTransaction();

            $deletedCount = DB::table('announcement_user_relations')
                ->where('USER_ID', $request->user_id)
                ->whereIn('ANNOUNCEMENT_ID', $request->announcement_ids)
                ->delete();

            DB::commit();

            return response()->json([
                'status' => true,
                'deleted_count' => $deletedCount,
                'message' => $deletedCount > 0
                    ? 'Announcements unassigned successfully.'
                    : 'No matching assignments found.'
            ], 200);

        } catch (\Exception $e) {

            DB::rollBack();

            \Log::error('Announcement Unassign Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function addNoticeAlertMsg(Request $request){
        try {
            $validation = Validator::make($request->all(), [
                'msg_content' => 'required|string',
//                'type' => 'required|in:success,info,warning,danger',
            ])->stopOnFirstFailure();

            if($validation->fails()){
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 422);
            }

            DB::beginTransaction();
            $newRecord = DB::table('notice_alerts')->insert([
                'CONTENT' => $request->msg_content,
                'REMARKS' => $request->remarks,
                'IS_ACTIVE' => $request->is_active,
            ]);
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Alert Msg added successfully',
                'data' => $newRecord
            ], 200);
        }
        catch (\Exception $e){
            DB::rollBack();
            \Log::error('Alert Msg Error: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function getNoticeAlertMsg(){
        try {
            $records = DB::table('notice_alerts')->where('IS_ACTIVE', 1)->first();
            return response()->json($records, 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getAllNoticeAlertMsg(){
        try {
            $records = DB::table('notice_alerts')
                ->orderByDesc('IS_ACTIVE')
                ->get();
            return response()->json($records, 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'error_message' => $e->getMessage()
            ]);
        }
    }

    public function updateNoticeAlertMsg(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'msg_content' => 'required|string',
                'alert_id'    => 'required|integer|exists:notice_alerts,ALERT_ID',
                // 'type' => 'required|in:success,info,warning,danger',
            ])->stopOnFirstFailure();

            if ($validation->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 422);
            }

            DB::beginTransaction();

            $updated = DB::table('notice_alerts')
                ->where('ALERT_ID', $request->alert_id)
                ->update([
                    'CONTENT'   => $request->msg_content,
                    'REMARKS'   => $request->remarks,
                    'IS_ACTIVE' => $request->is_active,
                    'UPDATED_AT' => now(), // if applicable
                ]);

            $record = DB::table('notice_alerts')
                ->where('ALERT_ID', $request->alert_id)
                ->first();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Alert Msg updated successfully',
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Alert Msg Update Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteNoticeAlertMsg(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'alert_id' => 'required|integer|exists:notice_alerts,ALERT_ID',
            ])->stopOnFirstFailure();

            if ($validation->fails()) {
                return response()->json([
                    'status' => false,
                    'error_message' => $validation->errors()->first(),
                    'message' => 'Validation failed'
                ], 422);
            }

            DB::beginTransaction();

            $record = DB::table('notice_alerts')
                ->where('ALERT_ID', $request->alert_id)
                ->first();

            $deleted = DB::table('notice_alerts')
                ->where('ALERT_ID', $request->alert_id)
                ->delete();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Alert Msg deleted successfully',
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('Alert Msg Delete Error: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
