<template>
  <Nav :isNavLinkVisible="false" />
  <ion-content v-bind="$attrs" class="scroller-body-inner" color="white" :fullscreen="true">
    <main class="tw-max-w-[1200px] tw-mx-auto tw-px-5 tw-py-8 tw-space-y-5">
      <h1 class="tw-font-bold tw-text-4xl tw-text-center tw-mb-4">TERMS & CONDITIONS FOR AJO-BY-COWRIS</h1>
      <div>
        <h2>1. DEFINITIONS</h2>
        <ul>
          <ol>
            1.1 Ajo-By-Cowris – A digital platform designed to facilitate the management of Rotating Savings and Credit Associations (ROSCA), group savings, and lending activities.
          </ol>
          <ol>
            1.2 User – Any individual or entity that registers on the App, including Members and Administrators.
          </ol>
          <ol>
            1.3 Administrator (Admin) – The individual who creates and manages an Ajo group within the App, including setting rules and overseeing financial transactions.
          </ol>
          <ol>
            1.4 Member – A registered participant of an Ajo group who contributes funds and receives payouts according to the agreed cycle.
          </ol>
          <ol>
            1.5 Contribution – The fixed amount of money a Member agrees to deposit at each cycle (e.g., weekly, bi-weekly, or monthly).
          </ol>
          <ol>
            1.6 Payout – The lump sum distributed to a Member according to the group's predetermined order or selection process.
          </ol>
          <ol>
            1.7 Cycle – The agreed-upon period within which all Members contribute and one Member receives a Payout.
          </ol>
          <ol>
            1.8 Wallet – The digital account within the App where funds are held for contributions and payouts.
          </ol>
        </ul>
      </div>

      <div>
        <h2>2. ELIGIBILITY & REGISTRATION</h2>
        <ul>
          <ol>
            <p>2.1 Who Can Register</p>

            <ul class="subItems">
              <li>Users must be at least 18 years old to use the App.</li>
              <li>Users must provide valid identification and banking details for verification purposes.</li>
              <li>Users must have a functional mobile number and email address for communication.</li>
            </ul>
          </ol>
          <ol>
            <p>2.2 Account Setup</p>

            <ul class="subItems">
              <li>Users must register using their full legal name and a valid phone number.</li>
              <li>Each User is responsible for keeping their login credentials confidential.</li>
              <li>Users must not create multiple accounts for fraudulent purposes.</li>
            </ul>
          </ol>
          <ol>
            <p>2.3 Verification</p>
            <ul class="subItems">
              <li>We may require Users to verify their identity through government-issued IDs, selfies, or other means.</li>
              <li>Failure to pass verification may result in account suspension or termination.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>3. FORMATION & MANAGEMENT OF AJO GROUPS</h2>

        <ul>
          <ol>
            <p>3.1 Creating a Group</p>

            <ul class="subItems">
              <li>An Administrator can create an Ajo group, set the contribution amount, and invite Members.</li>
              <li>The Admin must define the cycle length, Payout order, and any penalties for non-compliance.</li>
            </ul>
          </ol>
          <ol>
            <p>3.2 Joining a Group</p>

            <ul class="subItems">
              <li>Members must review and agree to the group's rules before joining.</li>
              <li>A Member may not leave a group before completing the full cycle unless they find an approved replacement.</li>
            </ul>
          </ol>
          <ol>
            <p>3.3 Contribution Process</p>

            <ul class="subItems">
              <li>Contributions must be made through the App using supported payment methods.</li>
              <li>Missed contributions may result in penalties, suspension, or removal from the group.</li>
            </ul>
          </ol>
          <ol>
            <p>3.4 Payout Process</p>

            <ul class="subItems">
              <li>The Payout is automatically transferred to the designated Member's wallet when their turn arrives.</li>
              <li>Members are responsible for withdrawing their funds to a linked bank account or mobile wallet.</li>
            </ul>
          </ol>
          <ol>
            <p>3.5 Dispute Resolution</p>

            <ul class="subItems">
              <li>Any disputes among Members must first be resolved internally within the group.</li>
              <li>If unresolved, the matter may be escalated to Cowris customer support for mediation.</li>
              <li>Cowris is not liable for disputes arising from agreements made outside the App.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>4. FEES & CHARGES</h2>
        <ul>
          <ol>
            <p>4.1 Transaction Fees</p>
            <ul class="subItems">
              <li>Cowris may charge processing fees for deposits, withdrawals, or service maintenance.</li>
              <li>Fees will be displayed transparently before transactions are completed.</li>
            </ul>
          </ol>
          <ol>
            <p>4.2 Penalties for Late Payments</p>
            <ul class="subItems">
              <li>Groups may impose penalties for late or missed contributions, which are deducted automatically.</li>
              <li>Repeated non-compliance may lead to suspension from the App.</li>
            </ul>
          </ol>
          <ol>
            <p>4.3 Currency Conversion & Charges</p>
            <ul class="subItems">
              <li>If a transaction requires currency conversion, standard exchange rates and processing fees apply.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>5. USER RESPONSIBILITIES</h2>
        <ul>
          <ol>
            <p>5.1 General Conduct</p>

            <ul class="subItems">
              <li>Users must not engage in fraudulent activities, money laundering, or scams.</li>
              <li>Users must not use the App for illegal financial transactions.</li>
            </ul>
          </ol>
          <ol>
            <p>5.2 Privacy & Data Security</p>

            <ul class="subItems">
              <li>Users must keep their account details confidential and notify Cowris immediately of unauthorized activity.</li>
              <li>Users must not share other Members' financial or personal details without consent.</li>
            </ul>
          </ol>
          <ol>
            <p>5.3 Compliance with Laws</p>

            <ul class="subItems">
              <li>Users must comply with applicable Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>6. LIMITATION OF LIABILITY</h2>
        <ul>
          <ol>
            <p>6.1 No Guarantee of Profits</p>

            <ul class="subItems">
              <li>Cowris does not guarantee any financial gains, as participation in Ajo groups is voluntary and at the User's risk.</li>
            </ul>
          </ol>
          <ol>
            <p>6.2 Liability for Losses</p>

            <ul>
              <li>
                <p>Cowris is not responsible for losses due to:</p>

                <ul class="subItems">
                  <li>Member defaults or fraud.</li>
                  <li>Banking errors or payment failures.</li>
                  <li>Market fluctuations affecting currency conversions.</li>
                </ul>
              </li>
            </ul>
          </ol>
          <ol>
            <p>6.3 Platform Downtime</p>

            <ul class="subItems">
              <li>While we strive for 99.9% uptime, we are not liable for losses due to temporary unavailability of the App.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>7. TERMINATION & ACCOUNT CLOSURE</h2>

        <ul>
          <ol>
            <p>7.1 Voluntary Exit</p>
            <ul class="subItems">
              <li>Users may close their accounts after settling all pending contributions and payouts.</li>
            </ul>
          </ol>
          <ol>
            <p>7.2 Suspension & Termination</p>
            <ul>
              <li>
                <p>We may suspend or terminate accounts involved in:</p>

                <ul class="subItems">
                  <li>Fraudulent activities.</li>
                  <li>Repeated defaults on contributions.</li>
                  <li>Violations of these Terms & Conditions.</li>
                </ul>
              </li>
            </ul>
          </ol>
          <ol>
            <p>7.3 Refund Policy</p>
            <ul>
              <li>Contributions already pooled into an active Ajo cycle are non-refundable unless the entire group agrees to a refund.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>8. CONFIDENTIALITY & DATA PRIVACY</h2>
        <ul>
          <ol>
            <p>8.1 Collection of Data</p>
            <ul class="subItems">
              <li>We collect personal and financial data to facilitate transactions and comply with regulations.</li>
            </ul>
          </ol>
          <ol>
            <p>8.2 Use of Data</p>
            <ul class="subItems">
              <li>Data will only be used for transaction processing, fraud prevention, and customer support.</li>
              <li>We do not sell Users' data to third parties.</li>
            </ul>
          </ol>
          <ol>
            <p>8.3 Third-Party Integrations</p>
            <ul class="subItems">
              <li>Payments and banking services may be processed by third-party providers, subject to their terms.</li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>9. AMENDMENTS & UPDATES</h2>
        <ul>
          <ol>
            9.1 Cowris reserves the right to modify these Terms at any time.
          </ol>
          <ol>
            9.2 Users will be notified in advance of significant changes.
          </ol>
        </ul>
      </div>

      <div>
        <h2>10. GOVERNING LAW & DISPUTE RESOLUTION</h2>
        <ul>
          <ol>
            10.1 These Terms shall be governed by the laws of Province of Ontario Canada
          </ol>
          <ol>
            10.2 Disputes shall be resolved through mediation, arbitration, or courts in the Province of Ontario Canada
          </ol>
        </ul>
      </div>

      <div>
        <h2>11. CONTACT INFORMATION</h2>
        <ul>
          <ol>
            <p>For inquiries or support, contact:</p>

            <ul class="subItems">
              <li>
                Email:
                <a class="tw-underline" href="mailto:help@cowris.com">help@cowris.com</a>
              </li>
              <li>
                Phone:
                <a class="tw-underline" href="tel:18667013614">1866 701 3614</a>
              </li>
              <li>
                Website:
                <a class="tw-underline" href="https://www.cowris.com">www.cowris.com</a>
              </li>
            </ul>
          </ol>
        </ul>
      </div>

      <div>
        <h2>12. ACCEPTANCE OF TERMS</h2>
        <p class="tw-text-lg">By registering on the Ajo-By-Cowris platform, you confirm that you have read, understood, and agree to these Terms & Conditions.</p>
      </div>
    </main>
  </ion-content>
</template>
<script>
import { IonContent } from "@ionic/vue";
import Nav from "@/components/Nav.vue";
export default {
  components: {
    IonContent,
    Nav,
  },
  inheritAttrs: false,
  data() {
    return {};
  },
};
</script>

<style scoped>
ion-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 96px);
}

ul {
  font-size: 1.125rem;
}

ul li a:hover {
  color: red;
}

h2 {
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 12px;
}

.subItems {
  list-style: disc;
  padding-left: 40px;
}
</style>
