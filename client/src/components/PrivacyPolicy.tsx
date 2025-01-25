const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-10 mb-10 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      <p className="text-lg text-gray-600 mb-6">
        At Pet Props, we are committed to protecting the privacy of our users.
        This Privacy Policy explains how we collect, use, and disclose your
        personal information when you use our website and services.
      </p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Introduction</h2>
      <p className="text-lg text-gray-600 mb-6">
        Pet Props is a pet adoption website that connects pets with loving
        homes. We understand the importance of protecting your personal
        information and are committed to being transparent about our data
        collection and use practices.
      </p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Information We Collect
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We collect the following types of information from our users:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="text-gray-600 mb-2">
          Personal information, such as your name, email address, phone number,
          and physical address
        </li>
        <li className="text-gray-600 mb-2">
          Information about your pets, such as their breed, age, and health
          status
        </li>
        <li className="text-gray-600 mb-2">
          Information about your adoption preferences, such as the type of pet
          you are interested in adopting and your lifestyle
        </li>
        <li className="text-gray-600 mb-2">
          Payment information, such as your credit card number and expiration
          date
        </li>
      </ul>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        How We Use Your Information
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We use your information for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="text-gray-600 mb-2">
          To provide you with access to our website and services
        </li>
        <li className="text-gray-600 mb-2">
          To match you with pets that meet your adoption preferences
        </li>
        <li className="text-gray-600 mb-2">
          To process adoption applications and facilitate adoptions
        </li>
        <li className="text-gray-600 mb-2">
          To communicate with you about your adoption application and the
          adoption process
        </li>
        <li className="text-gray-600 mb-2">
          To provide you with information about our services and promotions
        </li>
      </ul>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        How We Share Your Information
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We may share your information with the following parties:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="text-gray-600 mb-2">
          Pet shelters and rescue organizations
        </li>
        <li className="text-gray-600 mb-2">
          Other pet adoption websites and platforms
        </li>
        <li className="text-gray-600 mb-2">
          Payment processors and financial institutions
        </li>
        <li className="text-gray-600 mb-2">
          Law enforcement agencies and other government entities, as required by
          law
        </li>
      </ul>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Security Measures
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We take reasonable measures to protect your information from
        unauthorized access, disclosure, alteration, or destruction. These
        measures include:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="text-gray-600 mb-2">
          Encrypting your information using Secure Sockets Layer (SSL)
          technology
        </li>
        <li className="text-gray-600 mb-2">
          Storing your information on secure servers
        </li>
        <li className="text-gray-600 mb-2">
          Limiting access to your information to authorized personnel only
        </li>
      </ul>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Your Rights</h2>
      <p className="text-lg text-gray-600 mb-6">
        You have the following rights regarding your information:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="text-gray-600 mb-2">
          The right to access and correct your information
        </li>
        <li className="text-gray-600 mb-2">
          The right to opt-out of receiving marketing communications from us
        </li>
        <li className="text-gray-600 mb-2">
          The right to request that we delete your information
        </li>
      </ul>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Changes to This Policy
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We may update this Privacy Policy from time to time. When we do, we will
        post the updated policy on our website and revise the "Last Updated"
        date at the top of the policy.
      </p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h2>
      <p className="text-lg text-gray-600 mb-6">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:info@petprops.com"
          className="text-blue-600 hover:text-blue-800"
        >
          info@petprops.com
        </a>
        .
      </p>
    </div>
  );
};
export default PrivacyPolicy;
