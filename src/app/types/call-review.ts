export interface CreateOrUpdateStudentCallReviewRequest {
    bookingId: string;
    studentSatisfactionScore?: number;
    studentNotes?: string;
}

export interface CreateOrUpdateCoachCallReviewRequest {
    bookingId: string;
    coachSatisfactionScore?: number;
    coachNotes?: string;
}

export type CreateOrUpdateCallReviewRequest =
    | CreateOrUpdateStudentCallReviewRequest
    | CreateOrUpdateCoachCallReviewRequest;

interface CallReviewBase {
    id: string;
    bookingId: string;
    createdAt: string;
    updatedAt: string;
}

export interface StudentCallReview extends CallReviewBase {
    studentSatisfactionScore?: number;
    studentNotes?: string;
}

export interface CoachCallReview extends CallReviewBase {
    coachSatisfactionScore?: number;
    coachNotes?: string;
}

export type CallReview = StudentCallReview | CoachCallReview;
