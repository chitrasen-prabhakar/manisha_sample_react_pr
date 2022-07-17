export const displayMessages = {
  request: "Submitting data ...",
  fetch: "Fetching data ...",
  failed: "Failed",
  deleteRequest: "Deleting ...",
  deleteSuccess: (type) => `${type} deleted successfully!`,
  creationSuccess: (type) => `${type} created successfully!`,
  editSuccess: (type) => `${type} edited successfully!`,
  modeMismatch: "Unable to decide between create or edit mode",
  getAll: (type) => `Getting all ${type} ...`,
  check: "Checking if data exists ...",
  live: "Making live ...",
  liveSuccess: "Made live successfully!",
  update: "Updating data ...",
  approvalRequestSuccess: "Successfully sent for approval!",
  processing: "Processing data. Please wait ...",
  processed: "Data processed successfully!",
  download: "Downloading ..."
};


/**
 * 
 */
export const errorMessages={
  identifierUpdateError: "Please enter identifier or updated by",
  invalidXmlFileFormatError: "Invalid File format, use xls or xlsx",
  invalidFileFormat: "File formatted incorrectly",
  removeCurrentFileError: "Remove the current file first.",
  dataSubmitError: "There is some error while submitting the data",
  mandatoryProductTypeError: "Product type is mandatory field",
  invalidCommentError: "Invalid comment, minimum length = 4"
}

/**
 * 
 */

export const successMessages={
  fileContentsUploaded: "File contents uploaded successfully",
  dataSubmittedSuccessFully: "Data Submitted Successfully",
  formSubmittedSuccessFully: "Form Submitted Successfully",
  commentAdded: "Comment Added successfully",
  approved: "Approved Successfully",
  statusFetched: "Campaign status fetched successfully",
  couponUploadSuccess: 'Coupon uploaded successfully',
  couponDeleteSuccess: 'Coupon deleted successfully',
  folderUploadSuccess: 'Folder uploaded successfully',
  folderDeleteSuccess: 'Folder deleted successfully',
  billerBlockSuccess: 'Saved successfully',
}


