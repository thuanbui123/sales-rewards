import React from 'react';
import './NotFound.css';
function NotFound() {
    return (
        <div>
            <section className="error-container">
                <span>4</span>
                <span>
                    <span className="screen-reader-text">0</span>
                </span>
                <span>4</span>
            </section>
            <h1>Không tìm thấy nội dung 😓</h1>
            <p className="zoom-area">
                URL của nội dung này đã bị thay đổi hoặc không còn tồn tại. Nếu bạn đang lưu URL này, hãy thử truy cập
                lại từ trang chủ thay vì dùng URL đã lưu.
            </p>
        </div>
    );
}

export default NotFound;
