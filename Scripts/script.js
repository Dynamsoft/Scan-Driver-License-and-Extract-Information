Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady); // Register OnWebTwainReady event. This event fires as soon as Dynamic Web TWAIN is initialized and ready to be used

var DWObject, blankField = "", extrFieldsCount = 0;
var CurrentPathName = unescape(location.pathname);
var CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
var	strHTTPServer = location.hostname;	
var Barcode_text;
var driverLicenseFields = [];

function downloadBarcode_btn() {
	var localBarcodeVersion = DWObject._innerFun('GetAddOnVersion', '["barcode"]');
	if(Dynamsoft.Lib.env.bIE) {
		localBarcodeVersion = DWObject.getSWebTwain().GetAddonVersion("barcode");
	}
	if (localBarcodeVersion != Dynamsoft.BarcodeVersion) {
		var ObjString = [];
		ObjString.push('<div class="ds-demo-padding" id="barcode-install-dlg">');
		ObjString.push('The <strong>Barcode Reader</strong> is not installed on this Machine<br />Please click the button below to get it installed');
		ObjString.push('<p class="ds-demo-center"><input type="button" value="Install Barcode Reader" onclick="downloadBarcode();" class="ds-demo-blue ds-demo-btn-large ds-demo-border-0 ds-demo-margin ds-font-size-18" /><hr></p>');
		ObjString.push('<i><strong>The installation is a one-time process</strong> <br />It might take some time depending on your network.</i>');
		ObjString.push('</div>');
		Dynamsoft.WebTwainEnv.ShowDialog(400,310, ObjString.join(''));
	}
	else {
		/**/
	}
}
function downloadPDFR() {
	Dynamsoft__OnclickCloseInstallEx();
	DWObject.Addon.PDF.Download(
		CurrentPath + '/Resources/addon/Pdf.zip',
		function() {
			/*console.log('PDF dll is installed');*/
			downloadBarcode_btn();
		},
		function(errorCode, errorString) {
			console.log(errorString);
		}
	);
}

function downloadBarcode() {
	Dynamsoft__OnclickCloseInstallEx();	
	var _barcodePath = CurrentPath + '/Resources/addon/Barcode.zip';
	if(Dynamsoft.Lib.env.bMac) {
		_barcodePath = CurrentPath + '/Resources/addon/MacBarcode.zip'
	}
	DWObject.Addon.Barcode.Download(
		_barcodePath,
		function() {/*console.log('PDF dll is installed');*/
		
		},
		function(errorCode, errorString) {
			console.log(errorString);
		}
	);
}

function Dynamsoft_OnReady() {	
	blankField = document.getElementsByClassName('div-fields-item')[0].cloneNode(true);
	DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
	if (DWObject) {
		DWObject.IfSSL = DynamLib.detect.ssl;
		var _strPort = location.port == "" ? 80 : location.port;
		if (DynamLib.detect.ssl == true)
			_strPort = location.port == "" ? 443 : location.port;
		DWObject.HTTPPort = _strPort;
		/*
		* Make sure the PDF Rasterizer and OCR add-on are already installedsample
		*/
		if(!Dynamsoft.Lib.env.bMac) {
			var localPDFRVersion = DWObject._innerFun('GetAddOnVersion', '["pdf"]');	
			if(Dynamsoft.Lib.env.bIE) {
				localPDFRVersion = DWObject.getSWebTwain().GetAddonVersion("pdf");
			}
			if (localPDFRVersion != Dynamsoft.PdfVersion) {
				var ObjString = [];
				ObjString.push('<div class="ds-demo-padding" id="pdfr-install-dlg">');
				ObjString.push('The <strong>PDF Rasterizer</strong> is not installed on this PC<br />Please click the button below to get it installed');
				ObjString.push('<p class="ds-demo-center"><input type="button" value="Install PDF Rasterizer" onclick="downloadPDFR();" class="ds-demo-blue ds-demo-btn-large ds-demo-border-0 ds-demo-margin ds-font-size-18" /><hr></p>');
				ObjString.push('<i><strong>The installation is a one-time process</strong> <br />It might take some time depending on your network.</i>');
				ObjString.push('</div>');
				Dynamsoft.WebTwainEnv.ShowDialog(400,310, ObjString.join(''));
			}
			else {
				downloadBarcode_btn();
			}
		}
		else {
			downloadBarcode_btn();
		}
	}	
	DWObject.HTTPDownload(strHTTPServer, CurrentPath + "SampleDriverImage.jpg");
	driverLicenseFields = [
		{ 'abbreviation': 'DAA', 'description': 'Full Name' }
		, { 'abbreviation': 'DAB', 'description': 'Last Name' }
		, { 'abbreviation': 'DAB', 'description': 'Family Name' }
		, { 'abbreviation': 'DAC', 'description': 'First Name' }
		, { 'abbreviation': 'DAC', 'description': 'Given Name' }
		, { 'abbreviation': 'DAD', 'description': 'Middle Name or Initial' }
		, { 'abbreviation': 'DAD', 'description': 'Middle Name' }
		, { 'abbreviation': 'DAE', 'description': 'Name Suffix' }
		, { 'abbreviation': 'DAF', 'description': 'Name Prefix' }
		, { 'abbreviation': 'DAG', 'description': 'Mailing Street Address1' }
		, { 'abbreviation': 'DAH', 'description': 'Mailing Street Address2' }
		, { 'abbreviation': 'DAI', 'description': 'Mailing City' }
		, { 'abbreviation': 'DAJ', 'description': 'Mailing Jurisdiction Code' }
		, { 'abbreviation': 'DAK', 'description': 'Mailing Postal Code' }
		, { 'abbreviation': 'DAL', 'description': 'Residence Street Address1' }
		, { 'abbreviation': 'DAM', 'description': 'Residence Street Address2' }
		, { 'abbreviation': 'DAN', 'description': 'Residence City' }
		, { 'abbreviation': 'DAO', 'description': 'Residence Jurisdiction Code' }
		, { 'abbreviation': 'DAP', 'description': 'Residence Postal Code' }
		, { 'abbreviation': 'DAQ', 'description': 'License or ID Number' }
		, { 'abbreviation': 'DAR', 'description': 'License Classification Code' }
		, { 'abbreviation': 'DAS', 'description': 'License Restriction Code' }
		, { 'abbreviation': 'DAT', 'description': 'License Endorsements Code' }
		, { 'abbreviation': 'DAU', 'description': 'Height in FT_IN' }
		, { 'abbreviation': 'DAV', 'description': 'Height in CM' }
		, { 'abbreviation': 'DAW', 'description': 'Weight in LBS' }
		, { 'abbreviation': 'DAX', 'description': 'Weight in KG' }
		, { 'abbreviation': 'DAY', 'description': 'Eye Color' }
		, { 'abbreviation': 'DAZ', 'description': 'Hair Color' }
		, { 'abbreviation': 'DBA', 'description': 'License Expiration Date' }
		, { 'abbreviation': 'DBB', 'description': 'Date of Birth' }
		, { 'abbreviation': 'DBC', 'description': 'Sex' }
		, { 'abbreviation': 'DBD', 'description': 'License or ID Document Issue Date' }
		, { 'abbreviation': 'DBE', 'description': 'Issue Timestamp' }
		, { 'abbreviation': 'DBF', 'description': 'Number of Duplicates' }
		, { 'abbreviation': 'DBG', 'description': 'Medical Indicator Codes' }
		, { 'abbreviation': 'DBH', 'description': 'Organ Donor' }
		, { 'abbreviation': 'DBI', 'description': 'Non-Resident Indicator' }
		, { 'abbreviation': 'DBJ', 'description': 'Unique Customer Identifier' }
		, { 'abbreviation': 'DBK', 'description': 'Social Security Number' }
		, { 'abbreviation': 'DBL', 'description': 'Date Of Birth' }
		, { 'abbreviation': 'DBM', 'description': 'Social Security Number' }
		, { 'abbreviation': 'DBN', 'description': 'Full Name' }
		, { 'abbreviation': 'DBO', 'description': 'Last Name' }
		, { 'abbreviation': 'DBO', 'description': 'Family Name' }
		, { 'abbreviation': 'DBP', 'description': 'First Name' }
		, { 'abbreviation': 'DBP', 'description': 'Given Name' }
		, { 'abbreviation': 'DBQ', 'description': 'Middle Name' }
		, { 'abbreviation': 'DBQ', 'description': 'Middle Name or Initial' }
		, { 'abbreviation': 'DBR', 'description': 'Suffix' }
		, { 'abbreviation': 'DBS', 'description': 'Prefix' }
		, { 'abbreviation': 'DCA', 'description': 'Virginia Specific Class' }
		, { 'abbreviation': 'DCB', 'description': 'Virginia Specific Restrictions' }
		, { 'abbreviation': 'DCD', 'description': 'Virginia Specific Endorsements' }
		, { 'abbreviation': 'DCE', 'description': 'Physical Description Weight Range' }
		, { 'abbreviation': 'DCF', 'description': 'Document Discriminator' }
		, { 'abbreviation': 'DCG', 'description': 'Country territory of issuance' }
		, { 'abbreviation': 'DCH', 'description': 'Federal Commercial Vehicle Codes' }
		, { 'abbreviation': 'DCI', 'description': 'Place of birth' }
		, { 'abbreviation': 'DCJ', 'description': 'Audit information' }
		, { 'abbreviation': 'DCK', 'description': 'Inventory Control Number' }
		, { 'abbreviation': 'DCL', 'description': 'Race Ethnicity' }
		, { 'abbreviation': 'DCM', 'description': 'Standard vehicle classification' }
		, { 'abbreviation': 'DCN', 'description': 'Standard endorsement code' }
		, { 'abbreviation': 'DCO', 'description': 'Standard restriction code' }
		, { 'abbreviation': 'DCP', 'description': 'Jurisdiction specific vehicle classification description' }
		, { 'abbreviation': 'DCQ', 'description': 'Jurisdiction-specific' }
		, { 'abbreviation': 'DCR', 'description': 'Jurisdiction specific restriction code description' }
		, { 'abbreviation': 'DCS', 'description': 'Family Name' }
		, { 'abbreviation': 'DCS', 'description': 'Last Name' }
		, { 'abbreviation': 'DCT', 'description': 'Given Name' }
		, { 'abbreviation': 'DCT', 'description': 'First Name' }
		, { 'abbreviation': 'DCU', 'description': 'Suffix' }
		, { 'abbreviation': 'DDA', 'description': 'Compliance Type' }
		, { 'abbreviation': 'DDB', 'description': 'Card Revision Date' }
		, { 'abbreviation': 'DDC', 'description': 'HazMat Endorsement Expiry Date' }
		, { 'abbreviation': 'DDD', 'description': 'Limited Duration Document Indicator' }
		, { 'abbreviation': 'DDE', 'description': 'Family Name Truncation' }
		, { 'abbreviation': 'DDF', 'description': 'First Names Truncation' }
		, { 'abbreviation': 'DDG', 'description': 'Middle Names Truncation' }
		, { 'abbreviation': 'DDH', 'description': 'Under 18 Until' }
		, { 'abbreviation': 'DDI', 'description': 'Under 19 Until' }
		, { 'abbreviation': 'DDJ', 'description': 'Under 21 Until' }
		, { 'abbreviation': 'DDK', 'description': 'Organ Donor Indicator' }
		, { 'abbreviation': 'DDL', 'description': 'Veteran Indicator' }
		, { 'abbreviation': 'PAA', 'description': 'Permit Classification Code' }
		, { 'abbreviation': 'PAB', 'description': 'Permit Expiration Date' }
		, { 'abbreviation': 'PAC', 'description': 'Permit Identifier' }
		, { 'abbreviation': 'PAD', 'description': 'Permit IssueDate' }
		, { 'abbreviation': 'PAE', 'description': 'Permit Restriction Code' }
		, { 'abbreviation': 'PAF', 'description': 'Permit Endorsement Code' }
		, { 'abbreviation': 'ZVA', 'description': 'Court Restriction Code' }
	]
}

function addAField(){
	extrFieldsCount++;
	if(extrFieldsCount == 10){
		document.getElementById('div-extra-fields').style.overflowY='scroll';
	}
	if(document.getElementById('div-extra-fields').style.display=="none")
		document.getElementById('div-extra-fields').style.display='';
	else {
		document.getElementById('div-extra-fields').appendChild(blankField);
		blankField = document.getElementsByClassName('div-fields-item')[extrFieldsCount - 1].cloneNode(true);
	}
}

function GetField(keyword) {
	console.log(keyword);
	var k = Barcode_text.search(keyword);
	if (k == -1)
		return false;
	var m = Barcode_text.indexOf("\n", k);
	var subtext = Barcode_text.substring(k + 3, m);
	console.log(subtext);
	return subtext;
}

function GetBarcodeInfo(sImageIndex, result) {//This is the function called when barcode is read successfully
	//Retrieve barcode details
	var count = result.GetCount();
	if (count == 0) {
		alert("The barcode for the selected format is not found.");
		return;
	} else {
		for (i = 0; i < count; i++) {
			Barcode_text = result.GetContent(i);
			var x = result.GetX1(i);
			var y = result.GetY1(i);
			var format = result.GetFormat(i);
			var barcodeText = ("barcode[" + (i + 1) + "]: " + "\n" + Barcode_text + "\n");
			extractInformation();
		}
	}
}

function extractInformation() {
	for (var i = 0; i < driverLicenseFields.length; i++) {
		var __item = driverLicenseFields[i];
		console.log(__item.description);
		var _fieldValue = GetField(__item.abbreviation);
		if(_fieldValue != false){
			addAField();
			var _newField = document.getElementsByClassName('div-fields-item')[extrFieldsCount - 1];
			_newField.children[0].value = __item.description;
			_newField.children[1].value = _fieldValue;
		}
	}
}

function ReadBarcode() {
	if (DWObject) {
		if (DWObject.HowManyImagesInBuffer == 0) {
			alert("Please scan or load an image first.");
			return;
		}
		else {
			result = DWObject.Addon.Barcode.Read(
				DWObject.CurrentImageIndexInBuffer,
				EnumDWT_BarcodeFormat.PDF417,
				GetBarcodeInfo,
				function(errorCode, errorString) {
					alert(errorString);
				}
			);
		}
	}
}

function AcquireImage() {
	if (DWObject) {
		var bSelected = DWObject.SelectSource();
		if (bSelected) {
			var OnAcquireImageSuccess, OnAcquireImageFailure;
			OnAcquireImageSuccess = OnAcquireImageFailure = function() {
				DWObject.CloseSource();
			};

			DWObject.OpenSource();
			DWObject.IfDisableSourceAfterAcquire = true;  //Scanner source will be disabled/closed automatically after the scan.
			DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
		}
	}
}

function LoadImages() {
	if (DWObject) {
		var nCount = 0, nCountLoaded = 0, aryFilePaths = [];
		DWObject.IfShowFileDialog = false;
		function ds_load_pdfa(bSave, filesCount, index, path, filename){
			nCount = filesCount;
			if(nCount == -1 ){
				Dynamsoft.Lib.detect.hideMask();
				return;
			}
			var filePath = path + "\\" +  filename, _oFile = {};
			_oFile._filePath = filePath;
			_oFile._fileIsPDF = false;
			if((filename.substr(filename.lastIndexOf('.') + 1)).toLowerCase() == 'pdf'){
				_oFile._fileIsPDF = true;
			}
			aryFilePaths.push(_oFile);
			if(aryFilePaths.length == nCount)
			{
				var i = 0;
				function loadFileOneByOne(){
					if(aryFilePaths[i]._fileIsPDF){					
						DWObject.Addon.PDF.SetResolution(200);   
						DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConverMode.CM_RENDERALL);
					}
					DWObject.LoadImage(aryFilePaths[i]._filePath, 
						function() {
							console.log('Load Image:' + aryFilePaths[i]._filePath + ' -- successful');
							i++;
							if(i != nCount)
								loadFileOneByOne();
						},
						function (errorCode, errorString) {
							alert('Load Image:' + aryFilePaths[i]._filePath + errorString);
						}
					);
				}
				loadFileOneByOne();
			}
		}
		DWObject.RegisterEvent('OnGetFilePath', ds_load_pdfa);
		DWObject.RegisterEvent('OnPostLoad', function(path, name, type){
			nCountLoaded ++;
			console.log('load' + nCountLoaded);
			if(nCountLoaded == nCount){
				DWObject.UnregisterEvent('OnGetFilePath', ds_load_pdfa);
				Dynamsoft.Lib.detect.hideMask();
			}				
		});
		DWObject.ShowFileDialog(false,  "BMP, JPG, PNG, PDF and TIF | *.bmp;*.jpg;*.png;*.pdf;*.tif;*.tiff", 0, "", "", true, true, 0)		
		Dynamsoft.Lib.detect.showMask();
	}
}