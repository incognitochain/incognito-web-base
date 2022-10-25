import React, { memo } from 'react';

import { Styled } from './Policy.styled';

const Policy = () => {
  const renderSection1 = () => (
    <>
      <p className="fw-medium policy-sub-title">1. Parties</p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          1. The Incognito Website at https://incognito.org (the “Website”), the Incognito Wallet Apps (the “Apps) and
          related information technology system are Incognito LLC’s property and are governed and operated by Incognito
          LLC (“Incognito”). The Website and the Apps is a platform dedicated to is a platform dedicated to enable
          maximum privacy for crypto activities and transactions (hereinafter referred to as ”the Service”). For the
          convenience of wording in this Agreement, Incognito and the Website are referred to collectively as ”we” or
          other applicable forms of first person pronouns in this Agreement.
        </p>
        <p className="text2 policy-content">
          2. All natural persons or other subjects who log onto the Website or use the Apps shall be Users. For the
          convenience of wording in this Agreement, the users are referred to as ”you” or any other applicable forms of
          the second-person pronouns.
        </p>
        <p className="text2 policy-content">
          3. For the convenience of wording in this Agreement, you and we/us are collectively referred to as “both
          parties”, and individually as “one party”.
        </p>
      </div>
    </>
  );

  const renderSection2 = () => (
    <>
      <p className="fw-medium policy-sub-title">2. Purposes of the Privacy Policy</p>
      <p className="text2 policy-content">
        The Privacy Policy stipulates the types of information of yours that we may collect through your log-in to the
        Website and Apps, and/or use the services we offer, as well as how we shall use and protect the information so
        collected.
      </p>
    </>
  );

  const renderSection3 = () => (
    <>
      <p className="fw-medium policy-sub-title">3. Users Under Age 18</p>
      <p className="text2 policy-content">
        The Platform is only intended for adults eighteen (18) years of age and older. You are not allowed to use the
        Platform or provide information on it if you are under eighteen (18) years of age. If we learn that we have
        received personal information from, or about, a child under 13 without verification of parental consent, we will
        delete that information immediately. If you believe we might have any information from or about a child under
        thirteen (13), without parental consent, please contact us immediately at go@incognito.org.
      </p>
    </>
  );

  const renderSection4 = () => (
    <>
      <p className="fw-medium policy-sub-title">4. Information Collected</p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          1. You agree to permit us to track your activities on the Website and the Apps.
        </p>
        <p className="text2 policy-content">
          2. If you are willing to use the services offered by us, you will be required to fill in and provide the
          following two categories of information:
        </p>
        <div className="policy-wrap-number-content">
          <p className="text2 policy-content">
            1. Identity Information
            <br /> We do not collect identity information nor do we require user registration for using the Service.
          </p>
          <p className="text2 policy-content">
            2. Service information
            <br /> Such information helps us to contact you and provide you with our service and includes but not
            limited to, your email address (hereinafter collectively referred to as ”service information”).
          </p>
          <p className="text2 policy-content">
            3. When you use the Service, we may collect more information necessary from our exclusive mailboxes or in
            other manners that we consider as in compliance with relevant requirements, for the purpose of improving the
            functions of this Website, enhancing your experience of using the Service as well as the security thereof,
            or as is required by any court order, any applicable law, administrative regulation or any order of any
            other competent government agency.
          </p>
          <p className="text2 policy-content">
            4. If you visit any links to third-party websites as are listed on this Website or any link to any of our
            third-party partners, you shall agree to and comply with the separate and independent Privacy Policy of such
            third party website. We will not bear any liability for the contents and activities of such websites or the
            partners.
          </p>
        </div>
      </div>
    </>
  );

  const renderSection5 = () => (
    <>
      <p className="fw-medium policy-sub-title">5. Cookies</p>
      <p className="text2 policy-content">
        1. When you visit our Website, we may use Google Analytics via cookies to analyze user activity in order to
        improve the Website. Only when you use your computer to access our Website can the cookies be sent to your
        computer hard drive.
      </p>
      <p className="text2 policy-content">
        2. Cookies are usually used to record the habits and preferences of visitors in browsing the items on our
        Website. The information collected by cookies is non-registered and collective statistical data and does not
        involve personal data.
      </p>
      <p className="text2 policy-content">
        3. Cookies, which enable the Website or service provider system to recognize your browser and capture and recall
        information, cannot be used to obtain data on your hard drive, your email address, or your personal data. Most
        browsers are designed to accept cookies. You can opt to set your browser to reject cookies, or to notify you as
        soon as possible if cookies are loaded. However, if you set your browser to disable cookies, it is possible that
        you may not be able to launch or use some functions of our Website.
      </p>
    </>
  );
  const renderSection6 = () => (
    <>
      <p className="fw-medium policy-sub-title">6. Purposes of Information</p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          1. We will use the information that we collect for the following purposes or in the following ways:
        </p>
        <div className="policy-wrap-number-content">
          <p className="text2 policy-content">1. to provide you with our Services through our Website and Apps;</p>
          <p className="text2 policy-content">
            2. to improve and upgrade the Services (your information and feedback received by us can help us improve the
            Service, so that we can more effectively respond to your service requests and support needs);
          </p>
          <p className="text2 policy-content">
            3. to keep statistics relating to the use of our Website and Apps and to be used for data analysis carried
            out in cooperation with government agencies, public affairs institutions;
          </p>
          <p className="text2 policy-content">
            4. to personalize your experience (your information will help us to better respond to your personalized
            needs);
          </p>
          <p className="text2 policy-content">
            5. to facilitate transactions (your information, whether public or private, will not be sold, exchanged,
            transferred, or otherwise provided to any other company on any grounds without your consent, except for
            where doing so is expressly for the purpose of completing the transaction you require);
          </p>
          <p className="text2 policy-content">
            6. to send email regularly (the email address that you provide for the purpose of processing orders may be
            used to receive information on and updates to your orders, in addition to newsletters, updates, related
            products or services information, etc., that we may send to you from time to time);
          </p>
          <p className="text2 policy-content">
            7. to meet any other purposes as specified in the Terms of Service of the Website and Apps and all legal
            means adopted for satisfying such purposes.
          </p>
        </div>
        <p className="text2 policy-content">
          2. We do not sell, trade, or otherwise transfer information or allow others to collect or use information;
          with the exception of the following parties and the following information: our affiliates, trusted third
          parties who help us operate our websites, manage our business, or provide services to you, provided that such
          parties agree to keep such information confidential. This only applies when we believe that information
          disclosure is appropriate, or it is required by any of the applicable laws, regulations, rules or by any order
          of courts or other competent authorities, and is necessary for executing the strategy of our Website and
          ensuring the proper functioning of the Website, or as may be necessary for the related parties to provide
          services, or for the protection of the rights, property or safety of us or other persons. Your information
          will not be provided to other parties for marketing, advertising or other purposes.
        </p>
      </div>
    </>
  );

  const renderSection7 = () => (
    <>
      <p className="fw-medium policy-sub-title">7. Protection of Personal Data</p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          1. We adopt appropriate measures to protect and safeguard the security of your data including any personal
          data collected (if any). We will, to the greatest extent possible, ensure that any personal data collected
          through our Website and Apps (if any) shall be free from being subject to nuisance by any third party
          unrelated to us. The security measures that we may take include but are not limited to:
        </p>
        <div className="policy-wrap-number-content">
          <p className="text2 policy-content">
            - Electronic measures: The computer data that contains your personal information will be stored in computer
            systems and storage media that are subject to strict login restrictions.
          </p>
          <p className="text2 policy-content">
            - Management measures: only staff members duly authorized by us can access your personal data, and these
            staff members shall comply with our internal code concerning personal data confidentiality.
          </p>
          <p className="text2 policy-content">
            - Technical measures: such encryption techniques as Secure Socket Layer Encryption may be used to convey
            your personal data.
          </p>
          <p className="text2 policy-content">
            - Other measures: our network servers are protected by a proper “firewall”.
          </p>
        </div>
        <p className="text2 policy-content">
          2. If you are aware of any security flaws in our Website or Apps, please contact us immediately so that we can
          take appropriate action as soon as possible.
        </p>
        <p className="text2 policy-content">
          3. Despite the above-mentioned technical and security measures, we cannot guarantee that the information
          transmitted via the Internet is absolutely safe, so we cannot absolutely guarantee that the personal data that
          you provide to us through our Website will be safe at any time. We will not be held liable for any loss or
          damage arising from or caused by any event that may occur in connection with unauthorized access to your
          personal data, and we shall not be held liable for compensation for such loss or damage.
        </p>
      </div>
    </>
  );

  const renderSection8 = () => (
    <>
      <p className="fw-medium policy-sub-title">8. Use of Third Party Services</p>
      <p className="text2 policy-content">
        When and if Incognito uses third party services/websites to facilitate the operation of Incognito and the
        Incognito website, the use of information collected (if any) will also be subject to the third party’s privacy
        policy.
      </p>
    </>
  );

  const renderSection9 = () => (
    <>
      <p className="fw-medium policy-sub-title">9. Modification to the Privacy Policy</p>
      <p className="text2 policy-content">
        We reserve the right to amend the Privacy Policy from time to time, and at any time as necessary. We will inform
        you of the modifications made to the Privacy Policy by updating and publishing the effective date of the release
        of new versions hereof and highlighting the amendments. You shall regularly review the Privacy Policy and its
        subsequent modifications, and if you do not agree to such modifications, you shall immediately cease your access
        to this Website and the use of the Apps. When an updated version of this Privacy Policy is released, your
        continued visit to this Website and continued use of the Apps shall imply without doubt that you have agreed to
        be bound by the updated Privacy Policy.
      </p>
    </>
  );

  const renderSection10 = () => (
    <>
      <p className="fw-medium policy-sub-title">10. California Collection Notice</p>
      <p className="text2 policy-content">
        If you are a California resident, California law requires us to provide you with some additional information
        regarding how we collect, use, and share your “personal information” (as defined in the California Consumer
        Privacy Act (“CCPA”)), other than the personal information we collect in connection with providing financial
        products and services.
      </p>
      <p className="text2 policy-content">
        Depending on how you interact with our Website, Apps and the Service, we may collect the following categories of
        personal information about you, in addition to the information we collect in connection with providing financial
        products and services:
      </p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          - Identifiers, such as your name and contact information, IP address, and mobile device identifiers
        </p>
        <p className="text2 policy-content">- Commercial information such as purchase history</p>
        <p className="text2 policy-content">
          - Internet usage information, such as browsing history, access history, and use and interaction with our
          website.
        </p>
      </div>
    </>
  );

  const renderSection11 = () => (
    <>
      <p className="fw-medium policy-sub-title">11. Contact Us</p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          1. If you have any requests and comments, you can send an email to go@incognito.org, which is the only valid
          and official email address through which we communicate with you. We will not bear any responsibility for any
          information sent to you from other email addresses.
        </p>
        <p className="text2 policy-content">
          2. We only publish announcements and information on the basis of the valid and effective contact information
          on this Website or post announcements on this Website; therefore, we shall not be held liable for any loss
          arising from your trust in the information that has not been obtained through the above-mentioned means.
        </p>
        <p className="text2 policy-content">
          3. If you have any questions regarding our Privacy Policy, you are welcome to contact us at any time.
        </p>
      </div>
    </>
  );

  const renderAdditional = () => (
    <>
      <p className="fw-medium policy-sub-title">Your California Privacy Rights</p>
      <div className="policy-wrap-number-content">
        <p className="text2 policy-content">
          If you are a California resident, you may have certain rights. California law may permit you to request that
          we:
        </p>
        <p className="text2 policy-content">
          Provide you the categories of personal information we have collected or disclosed about you in the last twelve
          months; the categories of sources of such information; the business or commercial purpose for collecting or
          selling your personal information; and the categories of third parties with whom we shared personal
          information.
        </p>
        <p className="text2 policy-content">
          Provide access to and/or a copy of certain information we hold about you.
        </p>
        <p className="text2 policy-content">Delete certain information we have about you.</p>
        <p className="text2 policy-content">
          You may have the right to receive information about the financial incentives that we offer to you for your
          personal information (if any). You also have the right to not be discriminated against (as provided for in
          applicable law) for exercising certain of your rights. Certain information may be exempt from such requests
          under applicable law. For example, we need certain types of information so that we can provide the Services to
          you and for compliance with applicable law. If you ask us to delete certain information, you may no longer be
          able to access or use the Services.
        </p>
        <p className="text2 policy-content">
          California consumers may request, once per year, that we disclose the identity of any third parties with whom
          we have shared personal information for the third parties’ direct marketing purposes within the previous
          calendar year, along with the type of personal information disclosed.
        </p>
        <p className="text2 policy-content">
          To exercise your rights, please send us an email at go@incognito.org. You will need to provide additional
          information to verify your identity before we fulfill your request. You can also designate an authorized agent
          to make a request on your behalf. To do so, you must provide us with written authorization or a power of
          attorney, signed by you, for the agent to act on your behalf. You will still need to verify your identity
          directly with us.
        </p>
        <p className="fw-medium policy-sub-title">Additional Information for California Residents</p>
        <p className="text2 policy-content">
          The CCPA sets forth certain obligations for businesses that “sell” personal information. Based on the
          definition of “sell” under the CCPA and under current regulatory guidance, we do not believe we engage in such
          activity and have not engaged in such activity in the past twelve months. We do not sell information that
          directly identifies you such as your name and email address. We share certain information as set forth in the
          Information Use and Sharing section, above, and allow third parties to collect certain information about your
          activity, for example through cookies, as explained in Cookies / Tracking Technologies section, above. You can
          control these cookies through browser settings and other controls. We do not believe these activities are a
          sale of personal information.
        </p>
      </div>
    </>
  );

  return (
    <Styled className="default-padding-horizontal">
      <p className="fw-medium text-align-center policy-main-title">INCOGNITO’S PRIVACY POLICY</p>
      {renderSection1()}
      {renderSection2()}
      {renderSection3()}
      {renderSection4()}
      {renderSection5()}
      {renderSection6()}
      {renderSection7()}
      {renderSection8()}
      {renderSection9()}
      {renderSection10()}
      {renderAdditional()}
      {renderSection11()}
    </Styled>
  );
};

export default memo(Policy);
