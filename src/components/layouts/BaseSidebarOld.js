//lib imports
import { Layout, Menu } from "antd";
import {
  AreaChartOutlined,
  PicLeftOutlined,
  RollbackOutlined,
  MailOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  TableOutlined,
  DesktopOutlined,
  EditOutlined,
  QrcodeOutlined,
  BarChartOutlined,
  TabletOutlined,
  BarsOutlined,
  RetweetOutlined,
  ContactsOutlined,
  UploadOutlined,
  AuditOutlined,
  UserOutlined,
  StopOutlined,
  WalletOutlined,
  BoldOutlined,
  RobotOutlined,
  ProfileOutlined,
  DollarCircleOutlined,
  MobileOutlined ,
  AppstoreOutlined 
} from "@ant-design/icons";

//component imports
import ActiveLink from "src/components/layouts/ActiveLink";

//hook imports
import usePermission from "src/components/hooks/usePermission";

const { Sider } = Layout;
const { SubMenu } = Menu;

function BaseSidebar() {
  const permissions = usePermission();
  const showEmailListNav = permissions.includes("VIEW_CAMPAIGN_EMAIL_LIST") || permissions.includes("EDIT_CAMPAIGN_EMAIL_LIST");

  const showBillerManagement = permissions.includes("BILLER_MANAGEMENT_VIEW") || permissions.includes("BILLER_MANAGEMENT_EDIT");



  return (
    <Sider collapsible>
      <div className="text-center logo">
        <ActiveLink href="/" activeClassName="">
          <a>
            <img src="/v2/images/fcicon.png" width="40" />
          </a>
        </ActiveLink>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="0" icon={<RollbackOutlined />}>
          <a href="/#/home">Ops Panel V1</a>
        </Menu.Item>
        {permissions.includes("VIEW_CAMPAIGN_TRAIL") && (
          <Menu.Item key="1" icon={<AreaChartOutlined />}>
            <ActiveLink href="/" activeClassName="">
              <a>Campaign Trail</a>
            </ActiveLink>
          </Menu.Item>
        )}
        {(permissions.includes("VIEW_CAMPAIGN") ||
          (permissions.includes("CREATE_CAMPAIGN") &&
            permissions.includes("EDIT_CAMPAIGN"))) && (
            <SubMenu key="sub1" icon={<PicLeftOutlined />} title="Campaign Tool">
              {permissions.includes("CREATE_CAMPAIGN") &&
                permissions.includes("EDIT_CAMPAIGN") && (
                  <Menu.Item key="2">
                    <ActiveLink href="/campaign-tool/create" activeClassName="">
                      <a>Create</a>
                    </ActiveLink>
                  </Menu.Item>
                )}
              {permissions.includes("VIEW_CAMPAIGN") && (
                <Menu.Item key="3">
                  <ActiveLink href="/campaign-tool" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}
          {(permissions.includes("VIEW_VARIABLE_CASHBACK") ||
            permissions.includes("EDIT_VARIABLE_CASHBACK")) && (
        <Menu.Item key="4" icon={<AreaChartOutlined />}>
          <ActiveLink href="/variable-global-limits" activeClassName="">
            <a>Variable Cashback Global Limits</a>
          </ActiveLink>
        </Menu.Item>
            )}
        {showEmailListNav && (
          <Menu.Item key="5" icon={<MailOutlined />}>
            <ActiveLink href="/email-list-upload" activeClassName="">
              <a>Email List Upload</a>
            </ActiveLink>
          </Menu.Item>
        )}
        <Menu.Item key="6" icon={<InfoCircleOutlined />}>
          <ActiveLink href="/audit" activeClassName="">
            <a>Audit</a>
          </ActiveLink>
        </Menu.Item>
        {permissions.includes("OPS_SMSML") &&
          (<SubMenu key="smsparse" icon={<MailOutlined />} title="SMS Panel">
            <Menu.Item key="template" icon={<TableOutlined />}>
              <ActiveLink href="/sms/template" activeClassName="">
                <a>Template</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="domain" icon={<DesktopOutlined />}>
              <ActiveLink href="/sms/domain" activeClassName="">
                <a>Domain</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="token" icon={<EditOutlined />}>
              <ActiveLink href="/sms/token" activeClassName="">
                <a>Token</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="trans-cat" icon={<QrcodeOutlined />}>
              <ActiveLink href="/sms/transaction-category" activeClassName="">
                <a>Transaction Category</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="sender" icon={<BarChartOutlined />}>
              <ActiveLink href="/sms/sender" activeClassName="">
                <a>Sender</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="disabled" icon={<TableOutlined />}>
              <ActiveLink href="/sms/disabled-untrained" activeClassName="">
                <a>Disabled Untrained</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="shortcodes" icon={<DesktopOutlined />}>
              <ActiveLink href="/sms/shortcodes" activeClassName="">
                <a>Shortcodes</a>
              </ActiveLink>
            </Menu.Item>
          </SubMenu>
          )}
        {
          /**
           * template
           */
        }
        {(permissions.includes("TEMPLATE_CLASS_VIEW") ||
          permissions.includes("TEMPLATE_CLASS_EDIT")) && (
            <SubMenu key="templateSub" icon={<BarsOutlined />} title="Template Class">
              {permissions.includes("TEMPLATE_CLASS_EDIT") && (
                <Menu.Item key="11">
                  <ActiveLink href="/template-class/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("TEMPLATE_CLASS_VIEW") && (
                <Menu.Item key="12">
                  <ActiveLink href="/template-class" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}

        {
          /**
           * coupon
           * 
           */
        }

        {(permissions.includes("TEMPLATE_COUPONS") || 
          permissions.includes("TEMPLATE_COUPON_EDIT")) && (
          <SubMenu key="couponSub" icon={<TabletOutlined />} title="Coupon">
           {permissions.includes("TEMPLATE_COUPON_EDIT") && (
            <Menu.Item key="13">
              <ActiveLink href="/coupon/generate" activeClassName="">
                <a>Generate</a>
              </ActiveLink>
            </Menu.Item>
           )}
           {permissions.includes("TEMPLATE_COUPON_EDIT") && (
            <Menu.Item key="14">
              <ActiveLink href="/coupon/upload" activeClassName="">
                <a>Upload</a>
              </ActiveLink>
            </Menu.Item>
           )}
            {permissions.includes("TEMPLATE_COUPON_EDIT") && (
            <Menu.Item key="15">
              <ActiveLink href="/coupon/delete" activeClassName="">
                <a>Delete</a>
              </ActiveLink>
            </Menu.Item>
           )}
           {permissions.includes("TEMPLATE_COUPONS") && (
            <Menu.Item key="16">
              <ActiveLink href="/coupon" activeClassName="">
                <a>View</a>
              </ActiveLink>
            </Menu.Item>
           )}

          </SubMenu>
        )}


        {
          /**
           * Privilage group
           */
        }
        {(permissions.includes("VIEW_CLOSED_USER_GROUP") ||
          permissions.includes("EDIT_CLOSED_USER_GROUP")) && (
            <SubMenu key="closeUserSub" icon={<ContactsOutlined />} title="Closed User Group">
              {permissions.includes("EDIT_CLOSED_USER_GROUP") && (
                <Menu.Item key="17">
                  <ActiveLink href="/closed-user/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("VIEW_CLOSED_USER_GROUP") && (
                <Menu.Item key="18">
                  <ActiveLink href="/closed-user" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}

        {
          /**
           * upload landing page
           */
        }

        <SubMenu key="landingPageSub" icon={<UploadOutlined />} title="Landing Page">
          <Menu.Item key="19">
            <ActiveLink href="/landing-page/upload-folder" activeClassName="">
              <a>Upload Folder</a>
            </ActiveLink>
          </Menu.Item>

          <Menu.Item key="20">
            <ActiveLink href="/landing-page/delete-folder" activeClassName="">
              <a>Delete Folder</a>
            </ActiveLink>
          </Menu.Item>
        </SubMenu>


        {
          /**
           * 
           * bulk-refund
           */
        }

        {(permissions.includes("BULK_REFUND_VIEW")) && (
          <SubMenu key="BulkRefundSub" icon={<RetweetOutlined />} title="Bulk-Refund">
            <Menu.Item key="25" >
              <ActiveLink href="/bulk-refund/upload" activeClassName="">
                <a>Bulk Refund Upload</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="26" >
              <ActiveLink href="/bulk-refund/view" activeClassName="">
                <a>Bulk Refund Status</a>
              </ActiveLink>
            </Menu.Item>

          </SubMenu>
        )}



        {
          /**
           * Activation trail
           */
        }

        {
          // permissions.includes('VIEW_ACTIVATION_HISTORY') && <Menu.Item key="21" icon={<UserOutlined />}>
          //   <ActiveLink href="/activation-trail" activeClassName="">
          //     <a>Activation Trail</a>
          //   </ActiveLink>
          // </Menu.Item>
        }
            {(permissions.includes("KLICKPAY_USER")) &&(
            <SubMenu key="KpTransactionView" icon={<FileTextOutlined />} title="Klickpay Operations">
                <Menu.Item key="KpTransactionView1">
                  <ActiveLink href="/kp-transaction/summaryView" activeClassName="">
                    <a>Payments Dashboard</a>
                  </ActiveLink>
                </Menu.Item>   
            </SubMenu>
            )}




        {
          /**
           * Biller management service
           */
        }
        {(permissions.includes("BILLER_MANAGEMENT_VIEW") ||
          permissions.includes("BILLER_MANAGEMENT_EDIT")) && (
            <SubMenu key="billerSub" icon={<WalletOutlined />} title="Biller Mangement System">

              {
                showBillerManagement && (
                  <Menu.Item key="billerSub1">
                    <ActiveLink href="/biller-management" activeClassName="">
                      <a>View</a>
                    </ActiveLink>
                  </Menu.Item>
                )}
            </SubMenu>
          )
        }



        {
          /**
           * base upload
           */
        }


        {(permissions.includes("BASE_UPLOAD_CHECK") ||
          permissions.includes("BASE_UPLOAD_INSERT")) && (
            <SubMenu key="baseUploadSub" icon={<BoldOutlined />} title="Base Upload">
              {permissions.includes("BASE_UPLOAD_INSERT") && (
                <Menu.Item key="baseUploadSub1">
                  <ActiveLink href="/base-upload/insert" activeClassName="">
                    <a>Insert</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("BASE_UPLOAD_CHECK") && (

                <Menu.Item key="baseUploadSub2">
                  <ActiveLink href="/base-upload/check" activeClassName="">
                    <a>Check</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}

        {
          /**
           * chatbot
           */
        }


        {(permissions.includes("CHATBOT_VIEW") ||
          permissions.includes("CHATBOT_EDIT")) && (
            <SubMenu key="chatbotSub" icon={<RobotOutlined />} title="Chatbot Traffic">
              {permissions.includes("CHATBOT_EDIT") && (
                <Menu.Item key="chatbotSub1">
                  <ActiveLink href="/chat-bot/insert" activeClassName="">
                    <a>Insert Link</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("CHATBOT_VIEW") && (

                <Menu.Item key="chatbotSub2">
                  <ActiveLink href="/chat-bot/view" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
            
          )}
              {(permissions.includes("TRIGGER_TRANSACTION_HISTORY_L1") || permissions.includes("TRIGGER_TRANSACTION_HISTORY_L2") ||
                permissions.includes("TRIGGER_TRANSACTION_HISTORY_L3")) && (
              <SubMenu key="VernostOffers" icon={<ProfileOutlined />} title="Vernost Offers">
                <Menu.Item key="VernostOffers1">
                  <ActiveLink href="/vernost/customerOffers" activeClassName="">
                    <a>Customer Offers</a>
                  </ActiveLink>
                </Menu.Item>
          
                <Menu.Item key="VernostOffers2">
                  <ActiveLink href="/vernost/merchantOffers" activeClassName="">
                    <a>Merchant Offers</a>
                  </ActiveLink>
                </Menu.Item>    
            </SubMenu>
                 )} 
        {
          /**
           * bqr
           */
        }


        {(permissions.includes("BQR_VIEW") ||
          permissions.includes("BQR_EDIT")) && (
          <SubMenu key="bqrSub" icon={<QrcodeOutlined />} title="Merchant Dashboards">
            {permissions.includes("BQR_EDIT") && (
              <Menu.Item key="bqrSub1">
                <ActiveLink href="/bqr/generate" activeClassName="">
                  <a>Bulk QR String Generate</a>
                </ActiveLink>
              </Menu.Item>
              )}
            {permissions.includes("BQR_VIEW") && (

              <Menu.Item key="bqrSub2">
                <ActiveLink href="/bqr/check" activeClassName="">
                  <a>Download History</a>
                </ActiveLink>
              </Menu.Item>
              )}
            </SubMenu>
          )}


        {
          /**
           * 
           * pay-later bulk refund
           */
        }

        {(permissions.includes("PAY_LATER_BULK_REFUND")) && (
          <SubMenu key="PayLaterBulkRefundSub" icon={<DollarCircleOutlined />} title="Pay Later">
            <Menu.Item key="PayLaterBulkRefundSub1" >
              <ActiveLink href="/pay-later/upload" activeClassName="">
                <a>Reject Removal Upload</a>
              </ActiveLink>
            </Menu.Item>
            <Menu.Item key="PayLaterBulkRefundSub2" >
              <ActiveLink href="/pay-later/view" activeClassName="">
                <a>Reject Removal Status</a>
              </ActiveLink>
            </Menu.Item>

          </SubMenu>
        )}

        {
          /**
           * sms notification
           */
        }

        {(permissions.includes("SMS_NOTIFICATION_VIEW") ||
          permissions.includes("SMS_NOTIFICATION_EDIT")) && (
            <SubMenu key="smsNotification" icon={<MobileOutlined />} title="SMS Notification">
              {permissions.includes("SMS_NOTIFICATION_EDIT") && (
                <Menu.Item key="smsNotification1">
                  <ActiveLink href="/sms-notification/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("SMS_NOTIFICATION_VIEW") && (
                <Menu.Item key="smsNotification2">
                  <ActiveLink href="/sms-notification" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}
        {
          /**
           * email notification
           */
        }

        {(permissions.includes("EMAIL_NOTIFICATION_VIEW") ||
          permissions.includes("EMAIL_NOTIFICATION_EDIT")) && (
            <SubMenu key="emailNotification" icon={<MailOutlined />} title="Email Notification">
              {permissions.includes("EMAIL_NOTIFICATION_EDIT") && (
                <Menu.Item key="emailNotification1">
                  <ActiveLink href="/email-notification/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("EMAIL_NOTIFICATION_VIEW") && (
                <Menu.Item key="emailNotification2">
                  <ActiveLink href="/email-notification" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}
        {
          /**
           * banner notification
           */
        }

        {(permissions.includes("BANNER_NOTIFICATION_VIEW") ||
          permissions.includes("BANNER_NOTIFICATION_EDIT")) && (
            <SubMenu key="bannerNotification" icon={<AppstoreOutlined />} title="Banner Notification">
              {permissions.includes("BANNER_NOTIFICATION_EDIT") && (
                <Menu.Item key="bannerNotification1">
                  <ActiveLink href="/banner-notification/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("BANNER_NOTIFICATION_VIEW") && (
                <Menu.Item key="bannerNotification2">
                  <ActiveLink href="/banner-notification" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}


        {
          /**
           * ios notification
           */
        }

        {(permissions.includes("IOS_NOTIFICATION_VIEW") ||
          permissions.includes("IOS_NOTIFICATION_EDIT")) && (
            <SubMenu key="iosNotification" icon={<AppstoreOutlined />} title="IOS Notification">
              {permissions.includes("IOS_NOTIFICATION_EDIT") && (
                <Menu.Item key="iosNotification1">
                  <ActiveLink href="/ios-notification/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("IOS_NOTIFICATION_VIEW") && (
                <Menu.Item key="iosNotification2">
                  <ActiveLink href="/ios-notification" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}

        {
          /**
           * android notification
           */
        }

        {(permissions.includes("ANDROID_NOTIFICATION_VIEW") ||
          permissions.includes("ANDROID_NOTIFICATION_EDIT")) && (
            <SubMenu key="androidNotification" icon={<AppstoreOutlined />} title="Android Notification">
              {permissions.includes("ANDROID_NOTIFICATION_EDIT") && (
                <Menu.Item key="androidNotification1">
                  <ActiveLink href="/android-notification/create" activeClassName="">
                    <a>Create</a>
                  </ActiveLink>
                </Menu.Item>
              )}
              {permissions.includes("ANDROID_NOTIFICATION_VIEW") && (
                <Menu.Item key="androidNotification2">
                  <ActiveLink href="/android-notification" activeClassName="">
                    <a>View</a>
                  </ActiveLink>
                </Menu.Item>
              )}
            </SubMenu>
          )}


          <SubMenu key="amcOnboarding" icon={<AuditOutlined />} title="AMC Onboarding">
                <Menu.Item key="amcOnboarding1">
                  <ActiveLink href="/amc-onboarding/onboarding" activeClassName="">
                    <a>AMC Onboard</a>
                  </ActiveLink>
                </Menu.Item>
          
                <Menu.Item key="amcOnboarding2">
                  <ActiveLink href="/amc-onboarding/amc_listing" activeClassName="">
                    <a>AMC List</a>
                  </ActiveLink>
                </Menu.Item>    
            </SubMenu>

          {
            /**
             * 
             * unsubscribe-automation
             */
          }

          {(permissions.includes("UNSUBSCRIBE_USER") ||
           permissions.includes("UNSUBSCRIBE_USER_WRITE")) &&(
          <SubMenu key="UnsubscribeUser" icon={<StopOutlined />} title="Communication Management">
            {permissions.includes("UNSUBSCRIBE_USER_WRITE") && (
              <Menu.Item key="UnsubscribeUser1" >
              <ActiveLink href="/unsubscribe-automation/user" activeClassName="">
                <a>Unsubscribe User</a>
              </ActiveLink>
              </Menu.Item>
            )}
              {permissions.includes("UNSUBSCRIBE_USER") &&(
              <Menu.Item key="UnsubscribeUser2" >
              <ActiveLink href="/unsubscribe-automation/logs" activeClassName="">
                <a>Unsubscribe Logs</a>
              </ActiveLink>
              </Menu.Item>
              )}
              {permissions.includes("UNSUBSCRIBE_USER_WRITE") && (
              <Menu.Item key="UnsubscribeUser3" >
              <ActiveLink href="/unsubscribe-automation/bulk-upload" activeClassName="">
                <a>Bulk Upload</a>
              </ActiveLink>
              </Menu.Item>
              )}
          </SubMenu>
          )}

      </Menu>
    </Sider>
  );
}

export default BaseSidebar;
