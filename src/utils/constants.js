export const BULK_REFUND_OMS_ACTIVITY_ID = "BULK_REFUND_OMS_ACTIVITY_ID";
export const BULK_UNSUBSCRIBE_ACTIVITY_ID = "BULK_UNSUBSCRIBE_ACTIVITY_ID";
export const BULK_UPI_ERROR_CODE_ACTIVITY_ID = "BULK_UPI_ERROR_CODE_ACTIVITY_ID";
export const UNSUBSCRIBE_ACTIVITY_ID = "UNSUBSCRIBE_ACTIVITY_ID";
export const FOS_AGENT_HISTORY = "/fos-agent-dashboard/bulk-status";
export const BULK_REFUND_STATUS = "/bulk-refund/view";
export const REFUND_LABEL = "Upload Bulk Refund file (sample file with all fields entered)";
export const UNSUBSCRIPTION_LABEL = "Upload Bulk Unsubscription file (sample file with all fields entered)";
export const BULK_DECISION_ENGINE_ACTIVITY_ID = "BULK_DECISION_ENGINE_ACTIVITY_ID";
export const BULK_REFUND_TXN_ACTIVITY_ID ="BULK_REFUND_TXN_ACTIVITY_IDS";
export const BULK_UPI_REFUND_ACTIVITY_ID = "BULK_UPI_REFUND_ACTIVITY_ID";
export const BULK_UPI_REFUND_STATUS_ACTIVITY_ID = "BULK_UPI_REFUND_STATUS_ACTIVITY_ID";
export const AGENT_BULK_TYPES = [
    {
        type: 'BULK_FOS_ACCOUNT_ADD_ACTIVITY_IDS',
        sampleFile: 'getBulkFosAgentSampleFiles'
    },
    {
        type: 'BULK_FOS_ACCOUNT_CHANGE_STATUS_ACTIVITY_IDS',
        sampleFile: 'getBulkFosAgentChangeStatusSampleFiles'
    },
    {
        type: 'BULK_FOS_ACCOUNT_UPDATE_ACTIVITY_IDS',
        sampleFile: 'getBulkFosAgentUpdateSampleFiles'
    }

]
export const AGENT_STATUS = [
    {
        text: 'ACTIVE',
        value: 'ACTIVE'
    },
    {
        text: 'INACTIVE',
        value: 'INACTIVE'
    }
]
export const BILLER_UPDATE_ACTIVITY_ID = "BILLER_UPDATE_ACTIVITY_ID";
export const VARIABLE_NAME = "Enter variable Name";
export const RULE_NAME = "Enter Rule Name";
export const BULK_TXNS_LIMIT_UPDATE_ACTIVITY_ID = "BULK_MERCHANT_TXN_LIMIT_ACTIVITY_ID";
export const PAYABLE_ACTIVITY_ID = "PAYABLE_ACTIVITY_ID";
export const UNKNOWN_REFUND = "unknownRefund";
export const REFUND = "refundStatus";
export const REFUND_STATUS = "refund";
export const BULK_TRACKWIZZ_MERCHANT_AML_UPDATE_ACTIVITY_ID = "BULK_TRACKWIZZ_MERCHANT_AML_UPDATE_ACTIVITY_IDS"