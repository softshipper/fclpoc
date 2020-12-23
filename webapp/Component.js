sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"io/example/fclpoc/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"sap/f/FlexibleColumnLayoutSemanticHelper",
	"sap/base/util/UriParameters"
], function (UIComponent, Device, models, JSONModel, fioriLibrary, FlexibleColumnLayoutSemanticHelper, UriParameters) {
	"use strict";
	
	var LayoutType = fioriLibrary.LayoutType;

	return UIComponent.extend("io.example.fclpoc.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			const oModel = new JSONModel();
			this.setModel(oModel);

			this.getRouter().initialize();
		},

		getHelper: function () {
			var oFCL = this.getRootControl().byId("fcl"),
				oParams = UriParameters.fromQuery(location.search),
				oSettings = {
					defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
					mode: oParams.get("mode"),
					initialColumnsCount: oParams.get("initial"),
					maxColumnsCount: oParams.get("max")
				};

			return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
		}

	});
});