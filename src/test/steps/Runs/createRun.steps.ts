import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { RunPayload } from "../../../pages/components/interface";
import axios from "axios";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";
import { LibraryPage } from "../../../pages/libraryPage";

let loadPage: LoadPage;
let libraryPage: LibraryPage;
async function retryUntilExpectationPasses(
  expectation: () => Promise<void>,
  maxAttempts: number,
  delayMs: number
): Promise<void> {
  let attempts: number = 0;
  let error: Error | undefined;
  while (attempts < maxAttempts) {
    try {
      await expectation();
      return;
    } catch (e) {
      error = e as Error;
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs)); // Wait for the specified delay
    attempts++;
  }
  throw error; // Expectation failed even after retries, throw the last error
}

defineStep("User Should Be Redirected To Create Run Page", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.WaitForRedirection((url: { href: string | string[] }) =>
    url.href.includes("create-run")
  );
});

defineStep(
  "Container Volume Minimization Is Selected By default",
  async function () {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const isSelected = await loadPage.isContaineVolumeMinimizationSelected();
    expect(isSelected).toBeTruthy();
  }
);

defineStep("Shipment Maximization Is Selected By default", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isSelected = await loadPage.isShipmentMaxSelected();
  expect(isSelected).toBeTruthy();
});

defineStep("User Select Shipment Maximization", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.selectShipmentMaximization();
});

defineStep(
  "User Select Load Planning As {string}",
  async function (loadPlanning: string) {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    if (loadPlanning.toLowerCase() === "shipment maximization") {
      await loadPage.selectShipmentMaximization();
    }
  }
);

defineStep("User Select Container Volume Minimization", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.selectContainerVolMini();
});

defineStep(
  "User select container category as {string}",
  async (containerType: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.selectContainerCategory(containerType);
  }
);
defineStep(
  "User select container name as {string}",
  async (containerName: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.selectContainerType(containerName);
  }
);

defineStep(
  "The Other Container Categories Should Be Disabled According To Selected {string}",
  async (containerType: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const areDisabled = await loadPage.checkForDisabledCategories(
      containerType
    );
    expect(areDisabled).toBeTruthy();
  }
);

defineStep(
  "User set container count as {string}",
  async (containerCount: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.selectContainerCount(containerCount);
  }
);

defineStep(
  "User Set Winged Contours According To {string}",
  async (wingedFlags: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.setWingedContours(wingedFlags);
  }
);

defineStep("User Click On Next Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnNextButton();
});

defineStep("User Select {string}", async function (runType: string) {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.selectRunStrategy(runType);
});

defineStep("User Click On Run Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnRunButton();
});
defineStep("User Set Run Name", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.setRunName();
});

defineStep("Run Should Be Created", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const iscreated = await loadPage.checkRunCreation();
  expect(iscreated).toBeTruthy();
});

defineStep("Run Should succeed", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isSuccess = await loadPage.checkRunSuccess();
  expect(isSuccess).toBeTruthy();
});

defineStep("Modal Should Contain The Invalid Products", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.checkForInvalidProducts();
});

defineStep("User Click On Proceed Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnProceedButton();
});

defineStep(
  "User Created Run Using {string} In {string}",
  async (containerName: string, shipmentType: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    const baseUrl = loadPage.apiBaseUrl;
    const apiKey = loadPage.apiKey;
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    try {
      const response = await axios.get(
        `${baseUrl}${libraryPage.container.endpoints.read}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );
      const responseBody = response.data;

      const result = responseBody.result;

      for (const container of result) {
        if (container.name === containerName) {
          libraryPage.container.id = container.id;
          break;
        }
      }

      expect(responseBody.status).toBe("success");
      expect(responseBody.errorCode).toBe(null);
      expect(responseBody.errorMessage).toBe(null);
    } catch (error) {
      console.error("Error getting containers:", error);
      throw error;
    }

    const runPayload: RunPayload = {
      name: loadPage.run.name,
      containers: [
        {
          containerId: libraryPage.container.id,

          targetCenterOfGravity: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      ],
      loadPlanning: 1,
      executionMode: 1,
      ignoreInvalidItems: true,
      enableAutoStepByStepPdfGeneration: false,
      ceilingClearance: 0,
    };
    if (shipmentType.toLowerCase() == "air shipment") {
      delete runPayload.ceilingClearance;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/loads/${loadPage.id}/runs`,
        runPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );

      const responseBody = response.data;
      loadPage.run.id = responseBody.result.runId;
      expect(responseBody.status).toBe("success");

      await retryUntilExpectationPasses(
        async () => {
          const getRunStatus = await axios.get(
            `${baseUrl}/api/v1/loads/${loadPage.id}/runs`,
            {
              headers: {
                "Content-Type": "application/json",
                "x-deeppack-api-key": apiKey,
              },
            }
          );
          const status = getRunStatus.data.result[0].runResult.status;
          expect(status).toBe("Succeeded");
        },
        1000,
        500
      );
    } catch (error) {
      console.error("Error creating run:", error);
      throw error;
    }
  }
);

defineStep(
  "User Created Run Using Load Planning {int}",
  async (loadPlanningMode: number): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    const baseUrl = loadPage.apiBaseUrl;
    const apiKey = loadPage.apiKey;
    let count: number = 0;

    try {
      const response = await axios.get(
        `${baseUrl}${libraryPage.container.endpoints.read}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );
      const responseBody = response.data;

      const result = responseBody.result;

      for (const container of result) {
        if (container.name === "20 Standard") {
          libraryPage.container.predIds.twentyStandard = container.id;
          break;
        }
      }

      expect(responseBody.status).toBe("success");
      expect(responseBody.errorCode).toBe(null);
      expect(responseBody.errorMessage).toBe(null);
    } catch (error) {
      console.error("Error getting containers:", error);
      throw error;
    }

    let runPayload: any;
    let payload = {
      name: loadPage.run.name,
      containers: [
        {
          containerId: libraryPage.container.predIds.twentyStandard,
          count: count,
          targetCenterOfGravity: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      ],
      loadPlanning: loadPlanningMode,
      executionMode: 1,
      ignoreInvalidItems: true,
      ceilingClearance: 0,
      enableAutoStepByStepPdfGeneration: false,
    };

    if (loadPlanningMode === 2) {
      payload.containers[0].count = 1;
      runPayload = payload;
    } else {
      runPayload = {
        name: loadPage.run.name,
        containers: [
          {
            containerId: libraryPage.container.predIds.twentyStandard,
            targetCenterOfGravity: {
              x: 0,
              y: 0,
              z: 0,
            },
          },
        ],
        loadPlanning: loadPlanningMode,
        executionMode: 1,
        ignoreInvalidItems: true,
        ceilingClearance: 0,
        enableAutoStepByStepPdfGeneration: false,
      };
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/loads/${loadPage.id}/runs`,
        runPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );

      const responseBody = response.data;
      expect(responseBody.status).toBe("success");
      expect(responseBody.errorCode).toBe(null);
      expect(responseBody.errorMessage).toBe(null);
    } catch (error) {
      console.error("Error creating run:", error);
      throw error;
    }
  }
);

defineStep(
  "User Created Run Using The Created Container",
  async (): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    const baseUrl = loadPage.apiBaseUrl;
    const apiKey = loadPage.apiKey;

    const runPayload = {
      name: loadPage.run.name,
      containers: [
        {
          containerId: libraryPage.container.id,

          targetCenterOfGravity: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      ],
      loadPlanning: 1,
      executionMode: 1,
      ignoreInvalidItems: true,
      enableAutoStepByStepPdfGeneration: false,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/loads/${loadPage.id}/runs`,
        runPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-deeppack-api-key": apiKey,
          },
        }
      );

      const responseBody = response.data;
      expect(responseBody.status).toBe("success");
      expect(responseBody.errorCode).toBe(null);
      expect(responseBody.errorMessage).toBe(null);
    } catch (error) {
      console.error("Error creating run:", error);
      throw error;
    }
  }
);

defineStep("Results Button Should Be Hidden", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.resultsButtonShouldBeHidden();
});
