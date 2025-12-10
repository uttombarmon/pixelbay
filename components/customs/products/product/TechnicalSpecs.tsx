"use client";

import { SpecSection, SpecItem } from "./SpecComponents";

interface TechnicalSpecsProps {
  techSpecs: any;
}

export default function TechnicalSpecs({ techSpecs }: TechnicalSpecsProps) {
  if (!techSpecs) {
    return (
      <p className="text-muted-foreground">
        No technical specifications available for this product.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>

      {/* Performance */}
      {(techSpecs.processor ||
        techSpecs.ram ||
        techSpecs.storage ||
        techSpecs.gpu) && (
        <SpecSection title="Performance">
          {techSpecs.processor && (
            <SpecItem
              label="Processor"
              value={techSpecs.processor}
              sublabel={
                techSpecs.processorCores
                  ? `${techSpecs.processorCores} cores${
                      techSpecs.processorThreads
                        ? `, ${techSpecs.processorThreads} threads`
                        : ""
                    }${
                      techSpecs.processorSpeed
                        ? ` @ ${techSpecs.processorSpeed}`
                        : ""
                    }`
                  : undefined
              }
            />
          )}
          {techSpecs.ram && (
            <SpecItem
              label="RAM"
              value={`${techSpecs.ram}GB${
                techSpecs.ramType ? ` ${techSpecs.ramType}` : ""
              }`}
              sublabel={techSpecs.ramSpeed}
            />
          )}
          {techSpecs.storage && (
            <SpecItem
              label="Storage"
              value={`${techSpecs.storage}GB${
                techSpecs.storageType ? ` ${techSpecs.storageType}` : ""
              }`}
              sublabel={techSpecs.storageInterface}
            />
          )}
          {techSpecs.gpu && (
            <SpecItem
              label="Graphics"
              value={techSpecs.gpu}
              sublabel={
                techSpecs.gpuMemory
                  ? `${techSpecs.gpuMemory}GB${
                      techSpecs.gpuMemoryType
                        ? ` ${techSpecs.gpuMemoryType}`
                        : ""
                    }`
                  : undefined
              }
            />
          )}
          {techSpecs.antutuScore && (
            <SpecItem
              label="AnTuTu Score"
              value={techSpecs.antutuScore.toLocaleString()}
            />
          )}
          {techSpecs.geekbenchScore && (
            <SpecItem
              label="Geekbench Score"
              value={techSpecs.geekbenchScore.toLocaleString()}
            />
          )}
        </SpecSection>
      )}

      {/* Display */}
      {(techSpecs.displaySize ||
        techSpecs.displayTech ||
        techSpecs.displayResolution) && (
        <SpecSection title="Display">
          <SpecItem
            label="Size"
            value={techSpecs.displaySize && `${techSpecs.displaySize}"`}
          />
          <SpecItem label="Technology" value={techSpecs.displayTech} />
          <SpecItem label="Resolution" value={techSpecs.displayResolution} />
          <SpecItem
            label="Refresh Rate"
            value={techSpecs.refreshRate && `${techSpecs.refreshRate}Hz`}
          />
          <SpecItem
            label="Brightness"
            value={techSpecs.brightness && `${techSpecs.brightness} nits`}
          />
          <SpecItem label="Protection" value={techSpecs.screenCoating} />
        </SpecSection>
      )}

      {/* Battery */}
      {(techSpecs.batteryCapacity ||
        techSpecs.batteryLife ||
        techSpecs.fastCharging) && (
        <SpecSection title="Battery">
          <SpecItem
            label="Capacity"
            value={
              techSpecs.batteryCapacity &&
              `${techSpecs.batteryCapacity}mAh${
                techSpecs.batteryType ? ` (${techSpecs.batteryType})` : ""
              }`
            }
          />
          <SpecItem label="Battery Life" value={techSpecs.batteryLife} />
          <SpecItem label="Fast Charging" value={techSpecs.fastCharging} />
          <SpecItem
            label="Wireless Charging"
            value={techSpecs.wirelessCharging}
          />
        </SpecSection>
      )}

      {/* Camera */}
      {(techSpecs.rearCameraMP ||
        techSpecs.frontCameraMP ||
        techSpecs.videoCapability) && (
        <SpecSection title="Camera">
          <SpecItem
            label="Rear Camera"
            value={techSpecs.rearCameraMP}
            sublabel={techSpecs.rearCameraAperture}
          />
          <SpecItem
            label="Front Camera"
            value={techSpecs.frontCameraMP}
            sublabel={techSpecs.frontCameraAperture}
          />
          <SpecItem label="Video" value={techSpecs.videoCapability} />
          <SpecItem label="Optical Zoom" value={techSpecs.opticalZoom} />
        </SpecSection>
      )}

      {/* Connectivity */}
      {(techSpecs.wifi ||
        techSpecs.bluetooth ||
        techSpecs.cellular ||
        techSpecs.usb) && (
        <SpecSection title="Connectivity">
          <SpecItem label="WiFi" value={techSpecs.wifi} />
          <SpecItem label="Bluetooth" value={techSpecs.bluetooth} />
          <SpecItem label="Cellular" value={techSpecs.cellular} />
          <SpecItem label="USB" value={techSpecs.usb} />
          {techSpecs.nfc && <SpecItem label="NFC" value="Yes" />}
          <SpecItem label="Ports" value={techSpecs.ports} />
          <SpecItem label="SIM" value={techSpecs.sim} />
        </SpecSection>
      )}

      {/* Physical & Durability */}
      {(techSpecs.dimensions ||
        techSpecs.weight ||
        techSpecs.material ||
        techSpecs.ipRating) && (
        <SpecSection title="Physical & Durability">
          <SpecItem label="Dimensions" value={techSpecs.dimensions} />
          <SpecItem
            label="Weight"
            value={techSpecs.weight && `${techSpecs.weight}g`}
          />
          <SpecItem label="Material" value={techSpecs.material} />
          <SpecItem label="Water Resistance" value={techSpecs.ipRating} />
          <SpecItem label="MIL-STD Rating" value={techSpecs.mrlRating} />
          <SpecItem label="Drop Protection" value={techSpecs.dropProtection} />
        </SpecSection>
      )}

      {/* Software */}
      {(techSpecs.operatingSystem || techSpecs.softwareSupport) && (
        <SpecSection title="Software">
          <SpecItem
            label="Operating System"
            value={techSpecs.operatingSystem}
          />
          <SpecItem
            label="Software Support"
            value={
              techSpecs.softwareSupport && `${techSpecs.softwareSupport} years`
            }
          />
          <SpecItem label="Max OS Update" value={techSpecs.maxOSUpdate} />
        </SpecSection>
      )}

      {/* Audio */}
      {(techSpecs.speakerCount ||
        techSpecs.audioCodec ||
        techSpecs.microphone) && (
        <SpecSection title="Audio">
          <SpecItem
            label="Speakers"
            value={
              techSpecs.speakerCount &&
              `${techSpecs.speakerCount} speakers${
                techSpecs.speakerWatts ? ` (${techSpecs.speakerWatts})` : ""
              }`
            }
          />
          <SpecItem label="Audio Codec" value={techSpecs.audioCodec} />
          <SpecItem label="Microphone" value={techSpecs.microphone} />
        </SpecSection>
      )}
    </div>
  );
}
