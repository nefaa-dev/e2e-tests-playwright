export interface ProductInt {
    Shipment_Name: any;
    Product_Name: any;
    Shape: any;
    Height: any;
    Length: any;
    Width: any;
    Diameter: any;
    Quantity: any;
    Weight: any;
    Crushing_limit: any;
    Stacking_on_top: any;
    Stacking_ground: any;
    Rotation: any;
    Unloading_priority: any;
    Loading_Priority: any;
    Must_Go: any;
  }

export interface RunPayload {
    name: string;
    containers: {
      containerId: string;
      targetCenterOfGravity: {
        x: number;
        y: number;
        z: number;
      };
    }[];
    loadPlanning: number;
    executionMode: number;
    ignoreInvalidItems: boolean;
    enableAutoStepByStepPdfGeneration: boolean;
    ceilingClearance?: number;  // Make this property optional
  }




