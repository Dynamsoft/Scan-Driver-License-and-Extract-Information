//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on DWT: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2016, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 11.3
//
/// <reference path="dynamsoft.webtwain.initiate.js" />
var Dynamsoft = Dynamsoft || { WebTwainEnv: {} };

Dynamsoft.WebTwainEnv.AutoLoad = true;
///
Dynamsoft.WebTwainEnv.Containers = [{ContainerId:'dwtcontrolContainer', Width:270, Height:350}];
///
Dynamsoft.WebTwainEnv.ProductKey = 'C567F1791D3ED03B5CBE920DE42907638FED2C28D373011E95BFB00779AC8ED7502859928B977B2478BC5F3EFAE05AF8D84BC9833100F999A297802AAFAAD3F373544880E825B15A8B142A3DE705A976309BC8A43A2F4167508E7A39DF529A3BA59916F7A3AFD70C7EBF1793AD1D39D18BB335A0CF2E9EDA57003F982B7E99209145BAF52FAA21E8D00EA60C2D3925AEEE33084C7AAADDD976FD6617D4F31A638F0F7711C55ABE8FA151A694F3B7FC06A847A12EA0C1AA186975E20D428DAEDE79905E8DE158DD28E93AB05D9567354614A5E11928B9E54873738720F3E9A3CB634DC015E7718DF7EB8658AEECA8D6BD32D56F0EC36C37457E63C93EDDA8BE443B26E03FA8C7B2E54BDF';
///
Dynamsoft.WebTwainEnv.Trial = true;
///
Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = false;
///
Dynamsoft.WebTwainEnv.Debug = false; // only for debugger output
///
// Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';

/// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.

// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });

