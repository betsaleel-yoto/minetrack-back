-- CreateTable
CREATE TABLE "SuperAdmin" (
    "matriculationNumber" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("matriculationNumber")
);

-- CreateTable
CREATE TABLE "User" (
    "matriculationNumber" VARCHAR(255) NOT NULL,
    "UserName" VARCHAR(255) NOT NULL,
    "UserRole" VARCHAR(255) NOT NULL,
    "UserTitle" VARCHAR(255) NOT NULL,
    "matriculationNumberSadmin" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("matriculationNumber")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "SupplierId" VARCHAR(255) NOT NULL,
    "SupplierName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("SupplierId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "MaterialName" VARCHAR(255) NOT NULL,
    "DateOf_Order" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Quantity" VARCHAR(20) NOT NULL,
    "DeliveryDate" TIMESTAMP(3) NOT NULL,
    "matriculationNumberSadmin" VARCHAR(255) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recoit" (
    "supplierId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "MaterialName" VARCHAR(255) NOT NULL,
    "RelatedShipment" VARCHAR(255) NOT NULL,
    "InitialQte" VARCHAR(20) NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CurrentQte" VARCHAR(20) NOT NULL,
    "matriculationNumberSadmin" VARCHAR(255) NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "VehicleRegistrationNumber" VARCHAR(255) NOT NULL,
    "VehicleName" VARCHAR(255) NOT NULL,
    "StartOfUse" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "VehicleCondition" VARCHAR(6) NOT NULL,
    "MaintenanceDate" TIMESTAMP(3) NOT NULL,
    "matriculationNumberSadmin" VARCHAR(255) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("VehicleRegistrationNumber")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "RouteName" VARCHAR(255) NOT NULL,
    "RouteDescription" VARCHAR(255) NOT NULL,
    "RelatedMaterial" VARCHAR(255) NOT NULL,
    "matriculationNumberSadmin" VARCHAR(255) NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" SERIAL NOT NULL,
    "ShipmentTitle" VARCHAR(255) NOT NULL,
    "ShipmentDescription" VARCHAR(255) NOT NULL,
    "BeginDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "matriculationNumberSadmin" VARCHAR(255) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentTasks" (
    "id" SERIAL NOT NULL,
    "TaskDescription" VARCHAR(255) NOT NULL,
    "Taskstate" VARCHAR(20) NOT NULL,
    "ShipmentId" INTEGER NOT NULL,

    CONSTRAINT "ShipmentTasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "DriverName" VARCHAR(20) NOT NULL,
    "VehicleRegistrationNumber" VARCHAR(255) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "ParticipantName" VARCHAR(255) NOT NULL,
    "ParticipantRole" VARCHAR(255) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fait_partie" (
    "ParticipantId" INTEGER NOT NULL,
    "ShipmentId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_matriculationNumber_key" ON "SuperAdmin"("matriculationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_username_key" ON "SuperAdmin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_matriculationNumber_key" ON "User"("matriculationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_SupplierId_key" ON "Supplier"("SupplierId");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_SupplierName_key" ON "Supplier"("SupplierName");

-- CreateIndex
CREATE UNIQUE INDEX "Recoit_supplierId_orderId_key" ON "Recoit"("supplierId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_VehicleRegistrationNumber_key" ON "Vehicle"("VehicleRegistrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Fait_partie_ParticipantId_ShipmentId_key" ON "Fait_partie"("ParticipantId", "ShipmentId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_matriculationNumberSadmin_fkey" FOREIGN KEY ("matriculationNumberSadmin") REFERENCES "SuperAdmin"("matriculationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_matriculationNumberSadmin_fkey" FOREIGN KEY ("matriculationNumberSadmin") REFERENCES "SuperAdmin"("matriculationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoit" ADD CONSTRAINT "Recoit_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("SupplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recoit" ADD CONSTRAINT "Recoit_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_matriculationNumberSadmin_fkey" FOREIGN KEY ("matriculationNumberSadmin") REFERENCES "SuperAdmin"("matriculationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_matriculationNumberSadmin_fkey" FOREIGN KEY ("matriculationNumberSadmin") REFERENCES "SuperAdmin"("matriculationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_matriculationNumberSadmin_fkey" FOREIGN KEY ("matriculationNumberSadmin") REFERENCES "SuperAdmin"("matriculationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_matriculationNumberSadmin_fkey" FOREIGN KEY ("matriculationNumberSadmin") REFERENCES "SuperAdmin"("matriculationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentTasks" ADD CONSTRAINT "ShipmentTasks_ShipmentId_fkey" FOREIGN KEY ("ShipmentId") REFERENCES "Shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_VehicleRegistrationNumber_fkey" FOREIGN KEY ("VehicleRegistrationNumber") REFERENCES "Vehicle"("VehicleRegistrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fait_partie" ADD CONSTRAINT "Fait_partie_ParticipantId_fkey" FOREIGN KEY ("ParticipantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fait_partie" ADD CONSTRAINT "Fait_partie_ShipmentId_fkey" FOREIGN KEY ("ShipmentId") REFERENCES "Shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
