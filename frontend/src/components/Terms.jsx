import React from 'react';
import styles from '../styles/Terms.module.css'; // Assicurati di avere questo file CSS
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const TermsAndConditions = () => {
    const currentDate = new Date().toLocaleDateString(); // Data di oggi

    return (
        <Container className={`py-5 ${styles.termsContainer}`}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Terms and Conditions for Bool B&B</Card.Title>
                            <p className="text-center"><strong>Effective as of {currentDate}</strong></p>

                            <h5 className="mt-4">1. Booking and Reservations</h5>
                            <p>
                                To make a reservation at Bool B&B, you must provide valid identification and a payment method. Bookings are confirmed upon receipt of a deposit (if applicable) or full payment. Reservations are subject to availability, and we reserve the right to refuse bookings at our discretion.
                            </p>

                            <h5 className={styles.h5Style}>2. Cancellation Policy</h5>
                            <p>
                                Cancellations made 7 days or more before your check-in date will receive a full refund. Cancellations made less than 7 days before your check-in date will incur a cancellation fee of 50% of the total booking cost. In the case of a no-show or cancellation on the day of check-in, the full booking amount will be charged.
                            </p>

                            <h5 className={styles.h5Style}>3. Check-In and Check-Out</h5>
                            <p>
                                <strong>Check-In:</strong> The standard check-in time is from 3:00 PM onwards. If you plan to arrive after 8:00 PM, please notify us in advance.
                                <br />
                                <strong>Check-Out:</strong> The standard check-out time is 11:00 AM. Late check-out may be arranged upon request, subject to availability and additional charges.
                            </p>

                            <h5 className={styles.h5Style}>4. Payment Terms</h5>
                            <p>
                                Payments for stays at Bool B&B can be made via credit card, bank transfer, or PayPal. Full payment is due at the time of booking unless otherwise specified.
                            </p>

                            <h5 className={styles.h5Style}>5. House Rules</h5>
                            <p>
                                We aim to provide a peaceful and enjoyable environment for all our guests. Please respect the following house rules:
                                <ul className={styles.ulTerms}>
                                    <li>No smoking is allowed inside the premises. Smoking is permitted in designated outdoor areas.</li>
                                    <li>Pets are not allowed unless otherwise agreed upon.</li>
                                    <li>Please refrain from making loud noises after 10:00 PM to ensure a peaceful environment for all guests.</li>
                                    <li>Guests are responsible for any damage or loss caused to the property during their stay.</li>
                                </ul>
                            </p>

                            <h5 className={styles.h5Style}>6. Liability</h5>
                            <p>
                                Bool B&B is not responsible for any personal injury, loss, or damage to guests' property during their stay. Guests are advised to secure their valuables. We do not accept liability for any lost or stolen items. We make every effort to ensure the accuracy of the information on our website, but we do not accept liability for any errors or omissions.
                            </p>

                            <h5 className={styles.h5Style}>7. Privacy Policy</h5>
                            <p>
                                We respect your privacy and are committed to protecting your personal information. Any personal data we collect will be used solely for the purpose of your reservation and stay at Bool B&B. We will not share your personal information with third parties except as required by law or for purposes directly related to your stay.
                            </p>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TermsAndConditions;
