import { ELEMENT_TYPES, getTestId } from "../../utils/test-utils";
import cx from "classnames";
import React, { useCallback, useMemo } from "react";
import range from "lodash/range";
import { StepsDot } from "./StepsDot";
import styles from "./StepsGalleryHeader.module.scss";

const CSS_BASE_CLASS = "monday-style-steps-header_gallery";

export const StepsGalleryHeader = ({
  activeStepIndex,
  stepsCount,
  onChangeActiveStep,
  stepDescriptionFunc,
  id,
  "data-testid": dataTestId
}) => {
  const stepsPlaceholders = useMemo(() => range(stepsCount), [stepsCount]);
  const defaultStepDescriptionFunc = useCallback(stepIndex => `Step number ${stepIndex}`, []);
  const overrideStepDescriptionFunc = stepDescriptionFunc || defaultStepDescriptionFunc;
  const onClickFunctions = useMemo(
    () => stepsPlaceholders.map(stepIndex => e => onChangeActiveStep(e, stepIndex)),
    [onChangeActiveStep, stepsPlaceholders]
  );

  const galleryDots = useMemo(
    () =>
      stepsPlaceholders.map(
        stepIndex => (
          <StepsDot
            isActive={activeStepIndex === stepIndex}
            key={`monday-style-step-dot-${stepIndex + 1}`}
            stepIndex={stepIndex}
            ariaLabel={overrideStepDescriptionFunc(stepIndex)}
            onClick={onClickFunctions[stepIndex]}
          />
        ),
        []
      ),
    [activeStepIndex, onClickFunctions, overrideStepDescriptionFunc, stepsPlaceholders]
  );

  return (
    <div
      role="group"
      className={cx(styles.headerGallery, CSS_BASE_CLASS)}
      id={id}
      data-testid={dataTestId || getTestId(ELEMENT_TYPES.STEPS_GALLERY_HEADER, id)}
    >
      {galleryDots || null}
    </div>
  );
};