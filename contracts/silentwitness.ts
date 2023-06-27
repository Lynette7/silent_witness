import {
    Address,
    PScriptContext,
    PaymentCredentials,
    Script,
    bool,
    compile,
    data,
    makeValidator,
    pBool,
    pfn,
  } from "@harmoniclabs/plu-ts";
  
  type ReportingPayload = {
    crime: string;
    evidence?: string;
    reporterAddress: string;
    location: string;
  };
  
  const crimeOptions = ["FGM", "DV", "corruption", "other"];
  
  // Define the list of signed-up reporter addresses
  const signedUpReporters = [
    "address1",
    "address2",
    "address3",
    // Add more addresses as needed
  ];
  
  const corruptionReportingPlutus = pfn(
    [data, data, data, data, PScriptContext.type],
    bool
  )((crime, evidence, reporterAddress, location, ctx) => {
    // Perform validation checks on the provided data
    const isValid = validateCorruptionReport(crime, evidence, location);
  
    if (isValid) {
      // Return true if the corruption report is valid
      return pBool(true);
    } else {
      // Return false if the corruption report is invalid
      return pBool(false);
    }
  });
  
  function validateCorruptionReport(crime: string, evidence: string | undefined, location: string): boolean {
    // Implement your validation logic here
    // You can define conditions based on the project's requirements
  
    // Example validation logic:
    // - Check if the crime is one of the allowed options
    // - If evidence is required, check if it is provided
    // - Perform any other checks relevant to your project
  
    // Return true if the corruption report is valid, otherwise return false
    return true;
  }
  
  
  function validateReporterAddress(reporterAddress: string): boolean {
    // Compare the reporter's address to the list of signed-up reporter addresses
    const isSignedUpReporter = signedUpReporters.includes(reporterAddress);
  
    // Return true if the reporter's address is found in the signed-up reporter list
    return isSignedUpReporter;
  }
  
  export const untypedValidator = makeValidator(corruptionReportingPlutus);
  export const compiledContract = compile(untypedValidator);
  export const script = new Script("PlutusScriptV2", compiledContract);
  export const scriptTestnetAddr = new Address(
    "testnet",
    PaymentCredentials.script(script.hash)
  );
  