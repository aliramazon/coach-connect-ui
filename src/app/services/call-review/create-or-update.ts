import type {
    CallReview,
    CreateOrUpdateCallReviewRequest,
} from "../../types/call-review";
import { httpRequest } from "../../utils/http-request";

export interface CreateOrUpdateCallReviewResponse {
    success: boolean;
    message: string;
    data: {
        review: CallReview;
    };
}

export const createOrUpdate = (
    request: CreateOrUpdateCallReviewRequest
): Promise<CreateOrUpdateCallReviewResponse> => {
    return httpRequest<CreateOrUpdateCallReviewResponse>(`/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
};
