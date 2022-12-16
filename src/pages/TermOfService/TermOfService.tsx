import React, { memo } from 'react';

import { Styled } from './TermOfService.styled';

const TermOfService = () => {
  const renderSection1 = () => (
    <>
      <p className="fw-medium term-sub-title">Terms of Service</p>
      <div>
        <p className="text2 term-content">
          The following Terms of Service (the “Terms” or “TOS”) govern your access and use of Incognito Wallet
          Application (the “Apps”), together with the use of access to the Incognito Website at{' '}
          <a href="https://incognito.org/" target="_blank" className="term-link" rel="noreferrer">
            https://incognito.org
          </a>
          . All use of the Apps and any content of the Apps, including your account on the Apps (the “Account”) as well
          as the use of the Website is subject to this Terms of Service.
        </p>
        <p className="text2 term-content">
          By using the Apps and the Website, you acknowledge that you have read, fully understood and agreed to comply
          with the following Terms of Service. If you do not agree with any provision outlined in the Terms, you should
          not submit any information to, access information from, or otherwise utilize the Apps in any manner. Your
          acceptance of these Terms of Service form a binding User Agreement between you and this Apps and this Website.
        </p>
        <p className="text2 term-content">
          In the Terms of Service, all natural persons or other entities or subjects who log on to this Apps shall be
          deemed Users of this Apps. Users of this Apps, including owners, employees, agents and affiliates of any
          business, corporation, partnership or other entity that is, or is considering becoming, a user, lender or
          borrower are referred to as “you” or “your” or any other applicable forms of the second-person pronouns.
        </p>
        <p className="text2 term-content">
          This Apps and the Website is operated by Incognito and is a platform dedicated to provide a bridge into
          Incognito Decentralized Network for anonymous digital asset transfer with the goal to enable maximum privacy
          for crypto activities (hereinafter referred to as “the Service“). The Apps and Incognito, together with its
          affiliates, assignees, successors and its and their respective officers, directors, employees and agents are
          referred to as “Incognito, “we,” “us” or “our.” Together, you and we may be collectively referred to as
          “Parties” and individually as a “Party“.{' '}
        </p>
        <p className="text2 term-content">
          For the convenience of the Users, all content on this Apps and Website may be available in multiple languages.
          In case of any conflict between different language versions of such content or any omission in any language
          version, the English version of such content shall prevail.
        </p>
      </div>
    </>
  );
  const renderSection2 = () => (
    <>
      <p className="fw-medium term-sub-title">
        Modifications to the Terms of Service and the content of Apps and Website
      </p>
      <p className="text2 term-content">
        Incognito reserves the right to make amendments to the Terms at any time including but not limited to the terms
        of use, scope of services provided, rules and requirements, etc. It is your responsibility to review the Terms
        from time to time to see if modifications have been made. Your continued use of the Apps after any modification
        of the Terms will conclusively indicate that you have acknowledged and fully accepted those changes.
        Notwithstanding the above, we will seek, with reasonable effort, your consent to potential modifications to the
        Terms and the Apps to the extent we are required to do so by applicable laws and regulations. If the Apps
        terminates or substantially amends the scope of one or more of the services offered, such amendments shall take
        immediate effect on the date of announcement on the Apps.
      </p>
      <p className="text2 term-content">
        The content of this Apps may also be revised and updated from time to time without advance notice to you. While
        we shall take reasonable measures to ensure the accuracy of the information presented on the Apps, we do not
        guarantee the degree of such accuracy. As a result, we shall not be held accountable or be responsible for any
        potential or actual losses or damages arising directly or indirectly from the use of information on this Apps or
        from any delay or failure caused by any internet-related failure in transmitting or receiving any notice and
        information.
      </p>
      <p className="text2 term-content">
        The use of any internet-based services involves certain risks, including but not limited to failures in
        software, hardware or Internet links, etc. As the reliability and availability of the Internet is not within our
        control, we shall not be responsible for any issues directly or indirectly caused by any Internet-related
        failures.
      </p>
    </>
  );
  const renderSection3 = () => (
    <>
      <p className="fw-medium term-sub-title">Use of Electronic Communications</p>
      <p className="text2 term-content">
        You acknowledge and agree that the communications between you and Incognito shall be 100% in electronic form and
        you give full consent to receive communications from Incognito in electronic form, including e-mail. You agree
        that all terms and conditions, agreements, notices, disclosures and other communications that we provide to you
        electronically satisfy all legal requirements in the same manner such communications would have been
        satisfactory should they be provided in writing. With respect to these Terms, you waive any rights to require an
        original (non-electronic) signature or delivery or retention of non-electronic records, to the extent such
        waiver is not prohibited under applicable law. Only in cases where applicable laws and regulations explicitly
        require official written communications, we shall use our best and reasonable efforts to attempt written
        communication with you, only to the extent of information recorded in our system.
      </p>
      <p className="text2 term-content">
        The use of electronic communication involves certain risks, including but not limited to failures in software or
        Internet connectivity and reliability. As the reliability and availability of the Internet is not within our
        control, we shall not be responsible for any issues directly or indirectly caused by any Internet-related
        failures.
      </p>
      <p className="text2 term-content">
        All official announcements, news, promotions, competitions and other information shall be posted on relevant
        sections of the Apps. We urge all Users to refer to the Apps for updated information regularly. Incognito shall
        not be held liable or responsible in any manner should users incur any personal losses arising from ignorance of
        such updated information.
      </p>
    </>
  );
  const renderSection4 = () => (
    <>
      <p className="fw-medium term-sub-title">Privacy Policy</p>
      <p className="text2 term-content">
        Your privacy is very important to us. Incognito’s Privacy Policy (the “Privacy Policy”) explains how your
        personal information and your privacy are protected when using the Apps. By using the Apps, you agree that
        Incognito may use your information as set forth in the Privacy Policy. Incognito’s Privacy Policy is hereby
        incorporated in the Terms by reference in its entirety. The Privacy Policy can be found{' '}
        <a href="/privacy-policy" target="_blank" className="term-link" rel="noreferrer">
          here
        </a>
        .
      </p>
    </>
  );
  const renderSection5 = () => (
    <>
      <p className="fw-medium term-sub-title">General terms and conditions</p>
      <p className="text2 term-content">
        The Terms, together with the Privacy Policy, constitute the sole and entire agreement between you and the Apps
        and the Website with respect to the subject matter hereof and supersedes all other prior or contemporaneous
        negotiations, discussions, agreements, understandings, representations and warranties, both written and oral, if
        any between you and us with respect to such subject matter. You agree that no joint venture, partnership,
        employment, or agency relationship exists between you and Incognito as a result of the Terms or any use of the
        Apps and the Website. The failure of Incognito to exercise or enforce any right or provision of the Terms shall
        not constitute a waiver of such right or provision. If any provision of the Terms is found by a court of
        competent jurisdiction to be invalid, void, unlawful or unenforceable, the Parties agree that the court should
        give effect to the Parties’ intention as reflected in such provision, and the other provisions of the Terms
        shall remain in full force and effect. The section titles in the Terms are for convenience only and have no
        legal or contractual effect. Neither the course of conduct between you and Incognito, nor trade practice, shall
        act to modify any provision of the Terms. You acknowledge and agree that all rights not otherwise expressly
        granted to you by the Terms are reserved to Incognito.{' '}
      </p>
      <p className="text2 term-content">
        Incognito reserves the right to refuse provision of the Service to you at its absolute discretion.
      </p>
    </>
  );
  const renderSection6 = () => (
    <>
      <p className="fw-medium term-sub-title">Conditions for Your Use of the Apps and the Website</p>
      <p className="text2 term-content">
        By using the Apps and the Website, you agree to (a) the Terms and (b) applicable laws, regulations and generally
        accepted online business practices. Accordingly, you fully understand that:
      </p>
      <div className="term-wrap-number-content">
        <p className="text2 term-content">
          1. You hereby agree that any information that you provide including but not limited to information on your
          identification, contact details, finances and relationships is true, accurate and up to date. You and you only
          shall be responsible for the truthfulness and accuracy of the information you provide to us.
        </p>
        <p className="text2 term-content">
          2. You affirm that you are of legal age, i.e. 18 years of age or older and are legally capable to form a
          binding contract with us under the applicable laws and regulations of the sovereign state or region that has
          jurisdiction over you; and are acting on your own behalf. You confirm that you have not been previously
          banned, terminated, or otherwise denied access to the Apps by Incognito or by any competent authority.
        </p>
        <p className="text2 term-content">
          3. You acknowledge that it is your sole responsibility to ensure that all activities associated with this Apps
          and our Website, any activities undertaken via this Apps and Website, the release of information on this Apps
          and other behaviors are in full compliance with the applicable laws and regulations of the sovereign state or
          region that has jurisdiction over you. Incognito reserves the right to restrict, suspend or terminate your
          Incognito account access in cases where there are red flags of suspicious, illegal or illegitimate activities
          being detected by our Compliance team. We shall promptly request you to furnish further information to either
          clear the suspicion or reserve the right to report to relevant authority without advance notice to you.
        </p>
        <p className="text2 term-content">
          4. You undertake that all your assets including digital assets involved in transactions and activities
          undertaken on this Apps via its services are legally acquired and owned by you under the applicable laws and
          regulations of the sovereign state or region that has jurisdiction over you.
        </p>
        <p className="text2 term-content">
          5. No means to access and use the information, resources, services, products and tools of this Apps other than
          what we have provided to you are permitted. You hereby agree not to tamper with the Apps, for any purpose via
          any means, including but not limited collecting personally identifiable information and/or account information
          (including user names, passwords, e-mail addresses or other personal, financial or contact information) with
          respect to Incognito users, borrowers, investors, lenders or employees.
        </p>
        <p className="text2 term-content">
          6. Unless explicitly permitted by the Terms, you may not enable yourself or others to sell, copy, modify,
          correct, enhance, create derivative works from, publish, store or in any way distribute or otherwise exploit,
          including for any purpose competitive to Incognito or any commercial purpose any information or any other
          intellectual property from or on the Apps (including the Content (as defined below), any software on the Apps
          and any products or services sold or offered by Incognito.{' '}
        </p>
        <p className="text2 term-content">
          7. Without Incognito’s prior written consent, you may not (and you may not allow others to) (i) decompile,
          reverse engineer, convert or otherwise extract or disclose the underlying script, code (whether binary,
          assembly, source, object, HTML or otherwise) or structure of any Incognito’s intellectual properties
          (“Incognito IP”) or (ii) remove or alter authorship attribution or copyright notices or similar information on
          the Apps or any products or materials embodying or containing any Incognito IP.
        </p>
        <p className="text2 term-content">
          8. You agree not to violate, interfere with, impair or circumvent the ordinary operation, security, privacy or
          mission of the Apps or Incognito’s products, services or data, including overburdening, spamming or similar
          activities).
        </p>
        <p className="text2 term-content">
          9. You are solely responsible for all activity that occurs on or under your Incognito Account (whether or not
          such activities are expressly authorized by you), and for maintaining the confidentiality of your login
          details. You and we acknowledge and agree that Incognito shall have no liability to you or any other person
          for acts or omissions made or committed by any agent, representative or third-party service provider in
          respect of your Incognito Account.
        </p>
        <p className="text2 term-content">
          10. You agree that you will not transmit to Incognito or make available on or upload any information to the
          Apps that: i. is commercial or promotional in nature (without the prior written authorization of Incognito);
          ii. is unlawful, harmful, deceptive, or otherwise violates the legal rights or privacy of others or capable of
          giving rise to legal action whether against you or Incognito or any affiliate third party; iii. infringes any
          patent, trademark, trade secret, copyright, or other property rights of any party; iv. impersonates any person
          or entity (including Incognito or its employees and representatives); or v. contains viruses, malware or any
          program, code or technology designed to disrupt, intercept, impair or destroy the functionality of the Apps or
          its software, data or network.
        </p>
        <p className="text2 term-content">
          11. Incognito reserves the right to edit, restrict or remove any content you provide for any reason at any
          time. In addition, Incognito does not control any information provided by other users that may be made
          available on or through the Apps. Notwithstanding Incognito’s rights under the Terms, Incognito does not
          undertake, and shall not be obligated, to monitor the submission of any content to, or the publication of any
          content on, the Apps at any time. Incognito reserves the right to refuse service, terminate relationships,
          and/or cancel orders or transactions in its discretion.
        </p>
        <p className="text2 term-content">
          12. By submitting information, feedback or other material to Incognito, if any, including on or through the
          Apps or your Incognito Account or our Website, you: i. acknowledge that such information is non-confidential,
          except for any personal financial information; ii. grant Incognito a perpetual, worldwide, royalty-free,
          irrevocable, transferable, sub-licenseable, fully paid-up right to copy, use, reproduce, modify, adapt,
          publish, create derivative works from, translate, transmit, display, distribute, market, promote, sell or
          offer for sale, rent or lease such information or materials or any portions thereof (including any ideas for
          new products or modifications to existing products) and/or products or services which practice or embody, or
          are configured for use in practicing, such information or materials or any portion thereof, in any form or
          medium known or later developed, in furtherance of the terms of the Terms and the actions and transactions
          contemplated hereby, including the right to bring an action for infringement of these rights; and iii. agree
          that you will have no claim against any actual or alleged infringement of any proprietary rights, rights of
          privacy or publicity, moral rights or rights of attribution in connection with our use of any content you
          provide.
        </p>
        <p className="text2 term-content">
          13. We do not make any explicit or implicit warranties regarding your use of the Services offered by this
          Apps, including but not limited to the applicability, freedom from error or omission, consistency, accuracy,
          reliability, and applicability to a specific purpose, of the services provided by this Apps. Furthermore, we
          do not make any commitment or guarantee in connection with the validity, accuracy, correctness, reliability,
          quality, stability, integrity and timeliness of the technology and information covered by the services offered
          by this Apps. Whether to log in this Apps or use the services provided by this Apps is your personal decision
          and therefore you shall bear all the risks and possible losses arising from such decision.
        </p>
        <p className="text2 term-content">
          14. All the transaction calculations impacting your Incognito accounts are systematically calculated and are
          verified by us, and all the calculation methods have been posted on the Apps. We, at all times, will exercise
          best efforts to ensure the accuracy of such calculations, however, we do not and can not guarantee that all
          calculations are free from errors.
        </p>
      </div>
    </>
  );
  const renderSection7 = () => (
    <>
      <p className="fw-medium term-sub-title">The use of Digital Assets</p>
      <p className="text2 term-content">
        The use of the Apps may involve the use of Digital Assets. As a User of the Apps, you might select to engage in
        certain Cryptocurrency-related activities. The digital assets themselves as well as the selling and buying of
        such assets are not offered by this Apps. The cryptocurrency market is relatively new and is ever evolving over
        time and therefore a high level of risk including but not limited to significant price volatility is implied in
        any cryptocurrency transactions including but not limited to stable coin transactions. As such,
        cryptocurrency-related transactions might not be suitable for a vast majority of individuals.{' '}
      </p>
      <p className="text2 term-content">
        You acknowledge and fully understand that any holdings in digital assets may result in partial or total loss of
        funds and therefore you are advised to exercise caution and judgement when determining to engage in such
        cryptocurrency transactions. You acknowledge and understand that digital assets may generate derivative risks.
        Therefore, you are advised to seek professional advice prior to engaging in such transactions. Any and all
        losses arising therefrom shall be borne by you and we shall not be held liable in any manner. Incognito may
        suspend or terminate your account or use of the Apps, or the processing of any digital asset transaction, at any
        time if it determines in its sole discretion that you have violated this Agreement or that its provision or your
        use of the Service in your jurisdiction is unlawful.
      </p>
      <p className="text2 term-content">
        We do not make any explicit or implicit warranties in connection with the market, value and price of digital
        assets on this Apps. You understand and acknowledge that the digital asset market might be highly unstable, that
        the price and value of assets may fluctuate significantly at any time, and that the transaction of digital
        assets is solely based on your judgement and decision and therefore you shall assume any and all risks and
        losses that may be associated with such decisions.
      </p>
      <p className="text2 term-content">Supported Digital Assets</p>
      <p className="text2 term-content">
        A list of digital assets that Incognito currently supports is available via the Apps. Incognito may decide to no
        longer support a digital asset, at any time and for any reason at our sole discretion, including due to changes
        in a given digital asset’s characteristics after Incognito has provided support for the digital asset or due to
        a change in the digital asset’s regulatory classification.
      </p>
    </>
  );
  const renderSection8 = () => (
    <>
      <p className="fw-medium term-sub-title">Incognito’s Intellectual Property and Copyrights</p>
      <p className="text2 term-content">
        All rights, title, and interest in and to the Apps and the Content (defined below) and any all intellectual
        property contained therein or relating thereto, including any copyright, patent or trademark, are and will
        remain the exclusive property of Incognito or its licensors, as applicable (except where another person or
        entity is expressly credited as the provider of such content or data). Such intellectual property is protected
        by federal and state law and international treaties. You acknowledge and agree that no proprietary rights are
        being transferred to you in such materials or information, and that you have no intention of using such
        materials or information inappropriately or to in any way harm Incognito or any of its affiliates, directors,
        officers or employees.
      </p>
      <p className="text2 term-content">
        For purposes of the Terms, the “Content” shall include all contents of the Apps, including any logos,
        identifying marks, images, illustrations, designs, icons, photographs, videos, text and other written and
        multimedia materials, all of Incognito’s loan information (including rate information) and requirements,
        products, services, advertising materials or collateral, log-in or registration criteria and instructions, help
        guidelines, user documentation and customer and technical support documents, and the Apps’s likeness, look and
        feel, format, layout, software, code (whether binary, assembly, source, object, HTML or otherwise), routines,
        scripts, software, platforms and applications, as well as any data, files, archives, folders or downloads
        available on the Apps.
      </p>
      <p className="text2 term-content">
        Subject to the terms and conditions of the Terms, we grant you a limited, non-transferable, non-sub-licenseable,
        non-exclusive, revocable license to use the Apps and the Content for personal use until such time as the Terms
        terminate or expire or your right to use or access the Apps is terminated in accordance with the Terms.
      </p>
      <p className="text2 term-content">
        You acknowledge and agree that any violation of the provisions of the Terms regarding Incognito’s Intellectual
        Property, Copyrights and Identifying Marks and Acceptable Use of the Apps; Conditions of Your Use above may
        subject you to compensatory and punitive damages, and shall specifically also entitle Incognito to equitable
        relief (including an injunction), in addition to (and not in substitution or replacement for) any other
        available remedies at law or in equity, without the need for the posting of a bond or any other requirement.
      </p>
    </>
  );
  const renderSection9 = () => (
    <>
      <p className="fw-medium term-sub-title">No Solicitation or Offering, No Advice</p>
      <p className="text2 term-content">
        All opinions, information, discussions, analyses, prices, advice and other information on this Apps are general
        market reviews and do not constitute investment advice under any circumstances. We shall not be held accountable
        or be responsible for any actual or potential losses or damages arising directly or indirectly from your
        reliance on the aforementioned information when selecting the products to invest on this Apps.
      </p>
      <p className="text2 term-content">
        Except as otherwise expressly noted, the Content and the Apps do not constitute an offer to buy or sell or a
        solicitation of an offer to buy or sell investments, loans, securities, partnership interests, commodities or
        any other financial instruments; the Content and the Apps also do not constitute, and may not be used for or in
        connection with, an offer or solicitation by anyone in any state or jurisdiction in which such an offer or
        solicitation is not authorized or permitted, or to any person to whom it is unlawful to make such offer or
        solicitation.
      </p>
      <p className="text2 term-content">
        Incognito makes no representation or warranty, express or implied, to the extent not prohibited by applicable
        law, regarding the advisability of investing in securities, funds, partnership interests or other investments or
        funding or purchasing loans. The past performance of any investment, loan, security, partnership interest,
        commodity or financial instrument is not a guidance to future performance.
      </p>
      <p className="text2 term-content">
        Without limiting anything in the terms of service, Incognito and this Apps make no warranties and bear no
        liability with respect to any funds, any investments, securities, partnership interests, loans or their
        performance thereof.
      </p>
      <p className="text2 term-content">
        The Content and the views expressed in the Content do not necessarily reflect the views of Incognito as a whole,
        of its directors, officers, employees, shareholders or any part or member thereof or of any third party. No
        Content or information on the Apps constitutes, or should be construed as, investment, tax, legal, financial or
        any other advice.
      </p>
      <p className="text2 term-content">
        Certain statements on the Apps, including within the Content, may constitute forward-looking statements that
        involve known and unknown risks, uncertainties and other factors. Forward-looking statements should not be
        interpreted as advice and is in no way a form of solicitation, offering, or advice for Incognito’s products and
        services. The purpose of these forward-looking statements is merely to further explain our products and services
        and for marketing purposes, and should be interpreted as purely speculative.
      </p>
    </>
  );
  const renderSection10 = () => (
    <>
      <p className="fw-medium term-sub-title">Registration, Account access, Security and Data transmission</p>
      <p className="text2 term-content">You do not need to register in order to use the Apps.</p>
      <p className="text2 term-content">
        You acknowledge and agree that Incognito, at its sole discretion, may suspend or discontinue your, and refuse
        any and all current and future, access to or use any portion of this Apps at any time without notice to you.
      </p>
      <p className="text2 term-content">
        Incognito disclaims all liability, and you acknowledge and agree that we shall not be liable, for or in
        connection with any harm or damages to you or to any party resulting from the theft or unauthorized use of your
        user ID or password. You agree to notify us immediately of any such unauthorized use or any other actual or
        suspected breach of security. You can do so by emailing go@incognito.org.
      </p>
      <p className="text2 term-content">
        By accessing or using our Apps, you consent to the processing, transfer and storage of information about you in
        and to the United States and other countries, where you may not have the same rights and protections as you do
        under local law.
      </p>
      <p className="text2 term-content">
        Data transmitted via the Apps may use a Secure Sockets Layer (SSL) protocol, and data may be encrypted on some
        pages of the Apps. To the extent such technology is utilized on a given page, you may be unable to use certain
        account or customization features of the Apps unless your web browser software or phone supports such
        encryption. Please note that no technology can be considered completely secure or impenetrable and Internet
        protocols and other public and/or proprietary technology used or accessed by the Apps may be vulnerable to
        exploitation or compromise by persons engaged in hacking or criminal conduct. We and you each acknowledge and
        agree that, subject to applicable law, Incognito shall have no liability to you for any such exploitation or
        criminal conduct by third parties.
      </p>
    </>
  );
  const renderSection11 = () => (
    <>
      <p className="fw-medium term-sub-title">Suspicious Activities</p>
      <p className="text2 term-content">
        We perform periodic screening of transactions for suspicious activities. Certain suspicious transactions might
        be reported directly to relevant authorities without informing you in advance. In case of transactions we deemed
        suspicious, we reserve the right to revert the transaction to its original sources and may take action to report
        such transactions. Furthermore, we reserve the right to refuse to provide services to the account holder.
      </p>
    </>
  );
  const renderSection12 = () => (
    <>
      <p className="fw-medium term-sub-title">Third-Party Apps and Content</p>
      <p className="text2 term-content">
        The Apps may contain links or connections to third party websites. Any such link or connection is provided only
        as a convenience, and should be used at your own risk. Incognito has no control over any such other websites,
        the contents thereof or the products, services or policies represented. The existence of any link or other
        connection does not imply any affiliation, sponsorship, endorsement, approval, investigation, representation,
        warranty, verification or monitoring by Incognito or create any liability on the part of Incognito in respect of
        such link or connection. Please be aware that your use of any such third party websites is governed by the
        privacy policies of those sites, which we encourage you to review before using such sites.
      </p>
      <p className="text2 term-content">
        You and we hereby acknowledge and agree that Incognito shall have no responsibility for any liabilities arising
        from or related to the contents of any third party website or the use of any such website (including any mobile
        website) or the privacy policies and customer information practices of any such website.
      </p>
    </>
  );
  const renderSection13 = () => (
    <>
      <p className="fw-medium term-sub-title">Taxes</p>
      <p className="text2 term-content">
        You understand and acknowledge that Incognito does not provide tax or legal advice. You further understand and
        acknowledge that Incognito will report certain transactions to the Internal Revenue Service to the extent and
        manner in which it is required to do so by law.
      </p>
    </>
  );
  const renderSection14 = () => (
    <>
      <p className="fw-medium term-sub-title">Incognito’s Remedies</p>
      <p className="text2 term-content">
        Without prejudice to Incognito’s other rights under the Terms, if you breach the Terms in any way, Incognito may
        take such action as Incognito deems appropriate to deal with the breach, including suspending your access to the
        Apps, prohibiting you from accessing the Apps, blocking computers using your IP address from accessing the Apps,
        contacting your Internet service or other telecommunications provider to request that it block your access to
        the Apps and/or bringing court proceedings or taking other legal action against you. You acknowledge and agree
        that if you violate the Terms, Incognito will be entitled, at any time, to bring an action or proceeding for
        specific performance, injunctive relief or other equitable relief in addition to (and not to the exclusion of or
        in substitution for) any other remedies at law or in equity.
      </p>
    </>
  );
  const renderSection15 = () => (
    <>
      <p className="fw-medium term-sub-title">Indemnification and Limitation of Liability</p>
      <p className="text2 term-content">
        You agree to indemnify and hold harmless Incognito, its affiliates, contractors, licensors, and their respective
        directors, officers, employees and agents from and against any claims, actions, proceedings, investigations,
        demands, suits, costs, expenses and damages (including attorneys’ fees, fines or penalties imposed by any
        regulatory authority) arising out of or related to (i) your use of, or conduct in connection with, the Services,
        (ii) your breach or our enforcement of these Terms, or (iii) your violation of any applicable law, regulation,
        or rights of any third party during your use of the Service. If you are obligated to indemnify Incognito, its
        affiliates, contractors, licensors, and their respective directors, officers, employees or agents pursuant to
        this clause, we will have the right, in its sole discretion, to control any action or proceeding and to
        determine whether we wishes to settle, and if so, on what terms.
      </p>
      <p className="text2 term-content">
        To the maximum extent permitted by applicable law, in no event will the Apps, Incognito, its affiliates and
        their respective shareholders, members, directors, officers, employees, attorneys, agents, representatives,
        suppliers or contractors be liable for any incidental, indirect, special, punitive, consequential or similar
        damages or liabilities whatsoever (including, without limitation, damages for loss of data, information,
        revenue, profits or other business or financial benefit) arising out of or in connection with the services, any
        performance or non-performance of the services, or any other product, service or other item provided by or on
        behalf of the Apps, Incognito and its affiliates, whether under contract, statute, strict liability or other
        theory even if we has been advised of the possibility of such damages except to the extent of a final judicial
        determination that such damages were a result of Incognito’s gross negligence, fraud, willful misconduct or
        intentional violation of law. Some jurisdictions do not allow the exclusion or limitation of incidental or
        consequential damages, so the above limitation may not apply to you.
      </p>
      <p className="text2 term-content">
        Notwithstanding the foregoing, in no event will the liability of Incognito, its affiliates and their respective
        shareholders, members, directors, officers, employees, attorneys, agents, representatives, suppliers or
        contractors arising out of or in connection the services, any performance or non-performance of the services, or
        any other product, service or other item provided by or on behalf of Incognito or its affiliates whether under
        contract, statute, strict liability or other theory, exceed the amount of the fees paid by you to Incognito
        under this agreement in the twelve-month period immediately preceding the event giving rise to the claim for
        liability.
      </p>
    </>
  );
  const renderSection16 = () => (
    <>
      <p className="fw-medium term-sub-title">Your Use and Access Outside of the United States</p>
      <p className="text2 term-content">
        We make no claims that the Apps or the Content are appropriate for or may be downloaded or accessed outside of
        the United States. If you access the Apps from outside the United States, you do so at your own risk and are
        responsible for compliance with the applicable laws of the country or jurisdiction where you may be located. You
        may not use or export any content of the Apps in violation of U.S. export laws and regulations or any other U.S.
        or foreign federal, state or local statute, rule or regulation. The Content is not intended for distribution to,
        or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary
        to local law or regulation. Incognito makes no representations that the Content is appropriate for use in all
        locations, or that the transactions, products, loans, financial instruments or services indicated or discussed
        on the Apps are available or appropriate for sale or use in all jurisdictions, or countries or by all investors
        or counterparties.
      </p>
    </>
  );
  const renderSection17 = () => (
    <>
      <p className="fw-medium term-sub-title">Fair Practices</p>
      <p className="text2 term-content">
        You agree not to: (i) make any representations, warranties or guarantees on Incognito’s behalf or with respect
        to the Apps or any content or data contained on the Apps; (ii) make any false or misleading representations with
        regard to Incognito or the Apps or any content or data contained on the Apps; or (iii) participate or engage in
        any illegal, deceptive, misleading, fraudulent, unethical or improper practices on, through, by means of or with
        respect to the Apps.
      </p>
    </>
  );
  const renderSection18 = () => (
    <>
      <p className="fw-medium term-sub-title">Assignment</p>
      <p className="text2 term-content">
        You acknowledge and agree that you may not assign, delegate, sub-contract or otherwise transfer your rights
        and/or obligations under the Terms. Incognito may transfer, assign, delegate, sub-contract or otherwise transfer
        its rights and/or obligations under the Terms without notifying you or obtaining your consent.
      </p>
    </>
  );
  const renderSection19 = () => (
    <>
      <p className="fw-medium term-sub-title">Termination and Survival of Provisions</p>
      <p className="text2 term-content">
        The Apps reserves the right to revoke your account with this Apps in accordance with this Terms of Service, and
        this User Agreement shall be terminated on the date of the cancellation of your account. This Apps reserves the
        right to terminate all products and services offered by this Apps to you in accordance with the Terms.
      </p>
      <p className="text2 term-content">
        Automatic Termination for Non-Compliance: If you are not in full compliance with all of these Terms, the
        permissions granted to you under these Terms will automatically terminate, and you agree that in such
        circumstance you will no longer use or access, or be entitled to use or access, the Apps, the Content or any
        account on the Apps.
      </p>
      <p className="text2 term-content">
        Incognito’s Right to Terminate Your Use: Incognito may terminate your right to use the Apps, or block you from
        future use, at any time in its sole discretion, with or without cause, and without notice to you. Some
        circumstances in which Incognito may exercise this right to terminate your right to use the Apps include: i. you
        have breached any provision of the Terms; ii. you have engaged in conduct which Incognito, in its sole
        discretion, considers to be unacceptable; iii. Incognito is required by law to do so; or iv. Incognito no longer
        provides the Apps. The above are only examples of circumstances in which Incognito may terminate your right to
        use the Apps and Incognito may terminate your right to use the Apps for any other reason in its sole discretion.
        You agree that we shall not be liable to you due to or by reason of our termination of your right to use the
        Apps or the automatic termination of your right to use the Apps for non-compliance set forth above.
      </p>
      <p className="text2 term-content">
        Voluntary Termination by You: If you want to terminate your legal agreement with Incognito under or consisting
        of these Terms of Service, you may do so by: i. notifying Incognito at hello@myconstant.com or using the form on
        our Contact Page, or ii. closing your Incognito Account by following the procedures on the Incognito website.
        You acknowledge that any legal obligations you may have under any other agreement with Incognito (including any
        loan agreement or agreement governing lending or investing in Incognito or its affiliates) will not be affected
        in any way by the termination of the Terms and any such other agreement between you and Incognito will continue
        to be in effect in accordance with its terms.
      </p>{' '}
      <p className="text2 term-content">
        Survival of Provisions: Your obligations and the disclaimers and provisions relating to (i) Our Intellectual
        Property, Copyrights and Identifying Marks, (ii) Disclaimer of Warranties; Limitation of Liability, (iii)
        Indemnification, (iv) Use and Access Outside the United States and (v) General terms will survive any
        termination or expiration of the Terms for any reason.
      </p>
    </>
  );
  const renderSection20 = () => (
    <>
      <p className="fw-medium term-sub-title">Regulatory Compliance and Applicable Laws</p>
      <p className="text2 term-content">INCOGNITO LLC. is not a bank or a regulated financial institution.</p>
      <p className="text2 term-content">
        Transactions in digital assets are subject to applicable laws, regulations of the United States of America (the
        “USA”) federal and state government authorities. You understand that compliance with such law and regulations
        may include compliance with any guidance or direction of any regulatory authority or government agency, any writ
        of attachment, lien, levy, subpoena, warrant, or other legal order (collectively, “Legal Orders”). You
        understand and acknowledge that in no event will Incognito be obligated to affect any transaction it believes
        would violate any Applicable Law. You further understand and acknowledge that Incognito is not responsible for
        any losses, whether direct or indirect, that you may incur as a result of Incognito’s good faith efforts to
        comply with any Applicable Law, including any Legal Order.
      </p>
      <p className="text2 term-content">
        This Agreement in its entirety is a contract formed under the laws of the USA, and relevant laws and
        legislations of the USA shall apply to its establishment, interpretation, content and enforcement. Any claims or
        actions arising out of or relating to the Terms and the operation of this Apps shall be governed and interpreted
        and enforced in accordance with the laws of the USA. For the avoidance of doubt, this Clause shall be expressly
        applicable to any tort claim against us. The competent court or forum for any claim or action against us or in
        relation to us shall be in the USA. You have unconditional access to exclusive jurisdiction in court proceedings
        and appeals in the courts of the USA. You also unconditionally agree that the venue or competent court for any
        dispute or problem relating to this Agreement or any claim and proceeding arising from this Agreement shall be
        exclusively in the USA. If any other business of this Apps is subject to any special agreement on jurisdiction,
        such agreement shall prevail. We and you each hereby irrevocably and unconditionally consent to submit to the
        sole and exclusive jurisdiction of the United States of America for any litigation, lawsuit or proceeding
        between you and us arising out of or relating in any way to the Terms (including any non-contractual claims),
        the Apps or the Content, the negotiation, interpretation, validity or performance of the Terms, the rights and
        obligations of you and us hereunder or any transaction contemplated by the Apps.
      </p>
      <p className="text2 term-content">
        You and we each hereby irrevocably waive any and all rights which you or we, respectively, may have, or may have
        had, to bring such litigation in or before any other court or tribunal (whether domestic or foreign), or before
        any similar domestic or foreign authority or body, and agree not to claim or plead any such rights.
      </p>
    </>
  );
  const renderSection21 = () => (
    <>
      <p className="fw-medium term-sub-title">Severability</p>
      <p className="text2 term-content">
        If any provision of this Terms is found unenforceable, invalid or illegal by any court of competent
        jurisdiction, the validity of the remaining provisions of this Agreement shall not be affected.
      </p>
    </>
  );
  const renderSection22 = () => (
    <>
      <p className="fw-medium term-sub-title">Waiver of jury trial</p>
      <p className="text2 term-content">
        We and you each hereby agree to irrevocably and unconditionally waive any right we or you, respectively, may
        have to a jury trial in respect of any legal action or proceeding arising out of or relating to these terms of
        service or the website and any counterclaim therein. Each party certifies and acknowledges that such party has
        considered the implications of this waiver and makes this waiver voluntarily.
      </p>
    </>
  );
  const renderSection23 = () => (
    <>
      <p className="fw-medium term-sub-title">Class action waiver</p>
      <p className="text2 term-content">
        You and we agree that there will be no right or authority for any dispute to be brought, heard, or arbitrated as
        a class action (including without limitation opt out class actions or opt in collective class actions), or in a
        representative or private attorney general capacity on behalf of a class of persons or the general public. All
        disputes shall be resolved on an individual basis only.
      </p>
    </>
  );

  return (
    <Styled className="default-max-width">
      <p className="fw-medium text-align-center term-main-title">
        INCOGNITO WALLET APPLICATION and INCOGNITO WEBSITE <br />
        Terms of Service
      </p>
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
      {renderSection11()}
      {renderSection12()}
      {renderSection13()}
      {renderSection14()}
      {renderSection15()}
      {renderSection16()}
      {renderSection17()}
      {renderSection18()}
      {renderSection19()}
      {renderSection20()}
      {renderSection21()}
      {renderSection22()}
      {renderSection23()}
    </Styled>
  );
};

export default memo(TermOfService);
