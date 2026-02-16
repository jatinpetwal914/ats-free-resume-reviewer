export function uploadResume(fileName: string) {
  if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
    return { success: false, message: "Only PDF or DOCX files are allowed" };
  }

  return {
    success: true,
    message: "Resume uploaded successfully",
    fileName,
  };
}
