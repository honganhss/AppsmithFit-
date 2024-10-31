import * as _ from "../../../../support/Objects/ObjectsCore";

describe(
  "Validate API Auto generated headers",
  { tags: ["@tag.Datasource", "@tag.Git", "@tag.AccessControl"] },
  () => {
    it("1. Check whether auto generated header is set and overidden", () => {
      _.apiPage.CreateApi("FirstAPI");
      _.apiPage.SelectPaneTab("Body");

      // Assert binary file type and its autogenerated header
      _.apiPage.SelectSubTab("BINARY");
      _.apiPage.ValidateImportedHeaderParams(true, {
        key: "content-type",
        value: "application/octet-stream",
      });

      // Assert form urlencoded data format and its autogenerated header
      _.apiPage.SelectPaneTab("Body");
      _.apiPage.SelectSubTab("FORM_URLENCODED");
      _.apiPage.ValidateImportedHeaderParams(true, {
        key: "content-type",
        value: "application/x-www-form-urlencoded",
      });
      _.apiPage.EnterHeader("content-type", "application/json");
      _.apiPage.ValidateImportedKeyValueOverride(0);
      _.apiPage.EnterHeader("", "");
      _.apiPage.ValidateImportedKeyValueOverride(0, false);
      _.agHelper.AssertElementVisibility(
        _.apiPage._autoGeneratedHeaderInfoIcon("content-type"),
      );
      cy.get(_.apiPage._autoGeneratedHeaderInfoIcon("content-type")).realHover({
        pointer: "mouse",
      });

      _.agHelper.AssertContains(
        "This content-type header is auto-generated by appsmith based on body type of the API. Create a new header content-type to overwrite this value.",
        "be.visible",
      );
    });
  },
);
