const PrivacyPolicy: React.FC = () => {
    return (
        <div>
            <div className="">
                <p className="">Privacy Policy</p>
                <p className="">Last updated: January 23, 2025</p>
            </div>
            <div>
                <p>Information we Collect</p>
                <p>We collect basic information that you provide to us when registering on our platform.
                    This includes your name, email, and any other details you provide in your profile or
                    interactions with the platform. Additionally, we may collect data related to your
                    activity on the platform, including events you participate in, trips you organize, and
                    other content you post.</p>
            </div>
            <div>
                <p>How We Use Your Information</p>
                <p>The information we collect is stored securely in our databases and is primarily used to
                    operate and improve the platform. This data helps us enhance user experience, improve
                    features, and conduct analytics. We do not sell or share your personal information with
                    third parties for marketing purposes.</p>
            </div>
            <div>
                <p>Access and Control Over Your Data</p>
                <p>You have the right to view, edit, and delete your personal data. You can update your
                    profile, events, and trips at any time. If you wish to delete your account or any other
                    data, you may do so by following the instructions in the platform settings or contacting
                    us directly.</p>
            </div>
            <div>
                <p>Data Security</p>
                <p>We take the security of your personal data seriously. We use secure storage methods to
                    manage your login credentials and session data. We do not share your credentials with
                    any third party and ensure your data is kept private.</p>
            </div>
            <div>
                <p>Permissions We Request</p>
                <p>To provide a better service, we may request the following permissions from you:{'\n'}
                    <p className="font-bold">• Location:</p> We ask for permission to track your
                    location to enhance certain services and features, such as finding nearby events or trip
                    locations.{'\n'}
                    <p className="font-bold">• Gallery:</p> If you wish to upload photos, we will ask
                    for permission to access your device’s gallery.{'\n'}
                    <p className="font-bold">• Calendar:</p> To save event data, we request access to
                    your calendar to add upcoming events.
                    {'\n'}
                    <p className="font-bold">• Notifications:</p> We may send you notifications
                    related to the platform, such as event reminders or updates. You can choose to opt out
                    of these notifications at any time.{'\n\n'}You are free to deny these permissions;
                    however, opting out may limit your access to certain features of the platform.</p>
            </div>
            <div>
                <p>Third-Party Authentication</p>
                <p>We use Google Authentication to verify your identity when you log in. We do not share
                    your personal data with Google or any third parties beyond the necessary authentication
                    process. We do not allow third parties to access or process your personal information
                    unless explicitly stated.</p>
            </div>
            <div>
                <p>Your Rights</p>
                <p>You have the right to access, modify, or delete any personal information stored by us.
                    If you wish to review, change, or delete your personal data, please contact us through
                    the platform or via the provided contact information.</p>
            </div>
            <div>
                <p>Changes to This Privacy Policy</p>
                <p>We may update this Privacy Policy from time to time. If we make any significant changes,
                    we will notify you through the platform or via email. Your continued use of the platform
                    after such updates will be considered acceptance of the new Privacy Policy.</p>
            </div>
            <div>
                <p>Contact Us</p>
                <p>If you have any questions about this Privacy Policy or our data practices, please
                    contact us at:{'\n'}
                    <p className="font-bold">Email:</p> support@roamies.org.</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy