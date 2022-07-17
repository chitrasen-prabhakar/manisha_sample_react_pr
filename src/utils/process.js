//lib imports
import { message } from "antd";

import { putComment } from "src/api/services/maker-checker";
import { authEmail } from "src/api";
import { displayMessages } from "src/utils/messages";
import { createAudit } from "src/utils/api";
import { generalErrorHandler } from "src/utils/errors";

export const createAuditAndIntentComment = async (
  auditData,
  id,
  auditCase,
  intentIdentifier,
  intentCase,
  comment,
  campaignName
) => {
  const processMsg = message.loading(displayMessages.processing, 0);

  //audit hit to track changes
  const resAudit = await createAudit({
    oldDetails: null,
    updatedDetails: auditData,
    identifier: id,
    updatedBy: authEmail,
    usecase: auditCase,
    diffRequired: false,
  });

  //notify checkers about the changes
  let resComment = await putComment({
    identifierId: intentIdentifier,
    useCaseName: intentCase,
    userId: authEmail,
    message: comment,
    campaignName
  });

  processMsg();

  if (resComment.statusCode === 200 && resAudit.statusCode === 200) {
    message.success(displayMessages.processed);
  } else {
    if (resComment.statusCode !== 200) {
      generalErrorHandler(resComment);
    }
    if (resAudit.statusCode !== 200) {
      generalErrorHandler(resAudit);
    }
  }
};

export const createOnlyAudit = async (auditData, id, auditCase) => {
  const processMsg = message.loading(displayMessages.processing, 0);

  //audit hit to track changes
  const resAudit = await createAudit({
    oldDetails: null,
    updatedDetails: auditData,
    identifier: id,
    updatedBy: authEmail,
    usecase: auditCase,
    diffRequired: false,
  });

  processMsg();

  if (resAudit.statusCode === 200) {
    message.success(displayMessages.processed);
  } else {
    generalErrorHandler(resAudit);
  }
};
