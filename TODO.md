# Before final delivery

- [ ] عند اكتمال مشروع Shopery، ذكّر المستخدم بإرجاع خصائص ARIA ومراجعة إمكانية الوصول في جميع الصفحات، ثم تطبيقها بما يطابق السلوك الفعلي للواجهة.
- [ ] Include accessible names for icon buttons, form error relationships, active navigation, and drawer keyboard/focus behavior. Styling currently uses `data-invalid` and `data-current`; keep those visual states when restoring accessibility.
- [ ] Revisit explicit roles, hidden field labels and screen-reader-only text removed at the user's request on 2026-11-15. Restore them where needed during the final accessibility review.

ARIA attributes were temporarily removed from project source at the user's request on 2026-11-14. Attributes generated internally by third-party libraries were not modified.
