import React from 'react';

const TestimonialCard = ({ testimonial, author }) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <blockquote>
                    <div className="text-lg font-medium text-gray-900">
                        "{testimonial}"
                    </div>
                    <div className="mt-3 text-base text-gray-500">
                        - {author}
                    </div>
                </blockquote>
            </div>
        </div>
    );
}

export default TestimonialCard;
