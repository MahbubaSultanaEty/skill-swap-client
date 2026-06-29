"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Star } from "lucide-react";
import { serverMutation } from "@/lib/core/server";


export default function ReviewModal({
  taskId,
  reviewerEmail,
  revieweeEmail,
  deliverableUrl,
}) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment) return;
    setLoading(true);

    await serverMutation("/api/reviews", {
      taskId,
      reviewerEmail,
      revieweeEmail,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Modal>
      <Button size="sm" style={{ background: "#15803d", color: "#fff" }}>
        Review
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[420px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading style={{ color: "#0f172a" }}>
                Leave a Review
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              {submitted ? (
                <div className="py-6 text-center flex flex-col items-center gap-2">
                  <span className="text-3xl">🎉</span>
                  <p className="font-semibold" style={{ color: "#0f172a" }}>
                    Review submitted!
                  </p>
                  <p className="text-sm text-gray-400">
                    Thank you for your feedback.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Deliverable Link */}
                  <div
                    className="rounded-xl p-3 flex items-center gap-2 text-sm"
                    style={{ background: "#f1f5f9" }}
                  >
                    <a
                      href={deliverableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium truncate"
                      style={{ color: "#15803d" }}
                    >
                      <span className="text-gray-400">Deliverable:</span>

                      {deliverableUrl}
                    </a>
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Rating
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={28}
                          className="cursor-pointer transition-colors"
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setRating(star)}
                          fill={
                            star <= (hovered || rating) ? "#FFBF00" : "none"
                          }
                          style={{
                            color:
                              star <= (hovered || rating)
                                ? "#FFBF00"
                                : "#d1d5db",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Comment
                    </span>
                    <textarea
                      rows={4}
                      placeholder="Share your experience with this freelancer..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-neutral-200 outline-none resize-none"
                      style={{ color: "#0f172a" }}
                    />
                  </div>
                </div>
              )}
            </Modal.Body>

            {!submitted && (
              <Modal.Footer>
                <Button variant="secondary" slot="close">
                  Cancel
                </Button>
                <Button
                  isDisabled={!rating || !comment || loading}
                  isLoading={loading}
                  onPress={handleSubmit}
                  style={{ background: "#15803d", color: "#fff" }}
                >
                  Submit Review
                </Button>
              </Modal.Footer>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
