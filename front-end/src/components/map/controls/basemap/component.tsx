import { FC, useCallback, useEffect, useState } from 'react';

// components
import Tether from 'react-tether';

import Checkbox from 'components/forms/checkbox';
import Radio from 'components/forms/radio';
import Icon from 'components/icon';
import { BASEMAPS, LABELS } from 'components/map/constants';

import LAYERS_SVG from 'svgs/ui/layers.svg?sprite';

import { BasemapControlProps } from './types';

export const BasemapControls: FC<BasemapControlProps> = ({
  basemap,
  labels,
  boundaries,
  onChangeBasemap,
  onChangeLabels,
  onChangeBoundaries,
}: BasemapControlProps) => {
  const [active, setActive] = useState(false);

  const onScreenClick = useCallback((e) => {
    const el = document.getElementById('basemap-selector');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      setActive(false);
    }
  }, []);

  const onBasemapChange = useCallback(
    (evt) => {
      onChangeBasemap(BASEMAPS[evt.target.value]);
    },
    [onChangeBasemap],
  );

  const onLabelsChange = useCallback(
    (evt) => {
      onChangeLabels(LABELS[evt.target.value]);
    },
    [onChangeLabels],
  );

  const onBoundariesChange = useCallback(
    (evt) => {
      onChangeBoundaries(evt.target.checked);
    },
    [onChangeBoundaries],
  );

  useEffect(
    () => () => {
      document.removeEventListener('click', onScreenClick);
    },
    [],
  );

  useEffect(() => {
    if (active) {
      window.addEventListener('click', onScreenClick);
    } else {
      window.removeEventListener('click', onScreenClick);
    }

    return () => {
      window.removeEventListener('click', onScreenClick);
    };
  }, [active]);

  return (
    <div className="mt-0.5">
      <Tether
        attachment="top right"
        constraints={[{ to: 'window' }]}
        targetOffset="8px 100%"
        renderTarget={(ref) => (
          <button
            // @ts-ignore
            ref={ref}
            type="button"
            className="mt-1 p-1.5 bg-white text-black"
            onClick={() => {
              setActive(true);
            }}
          >
            <Icon icon={LAYERS_SVG} className="w-5 h-5" />
          </button>
        )}
        renderElement={(ref) => {
          if (!active) return null;

          return (
            // @ts-ignore
            <div ref={ref} className="bg-white p-4 rounded" id="basemap-selector">
              <ul className="flex flex-col">
                {Object.keys(BASEMAPS).map((k) => (
                  <li key={BASEMAPS[k].id} className="flex items-center mt-1.5 first:mt-0">
                    <Radio
                      name="basemap"
                      title={BASEMAPS[k].label}
                      value={BASEMAPS[k].value}
                      checked={basemap === BASEMAPS[k].value}
                      onChange={onBasemapChange}
                    />
                    <label
                      htmlFor={BASEMAPS[k].label}
                      className="ml-1.5 text-sm font-normal antialiased text-rw-gray"
                    >
                      {BASEMAPS[k].label}
                    </label>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 my-3" />
              <ul className="flex flex-col">
                {Object.keys(LABELS).map((k) => (
                  <li key={LABELS[k].id} className="flex items-center mt-1.5 first:mt-0">
                    <Radio
                      name="labels"
                      title={LABELS[k].label}
                      value={LABELS[k].value}
                      checked={labels === LABELS[k].value}
                      onChange={onLabelsChange}
                    />
                    <label
                      htmlFor={LABELS[k].label}
                      className="ml-1.5 text-sm font-normal antialiased text-rw-gray"
                    >
                      {LABELS[k].label}
                    </label>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 my-3" />

              <div className="flex items-center">
                <Checkbox
                  name="boundaries"
                  title="Boundaries"
                  value="boundaries"
                  checked={boundaries}
                  onChange={onBoundariesChange}
                  className="cursor-pointer"
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  htmlFor="boundaries"
                  className="ml-1.5 text-sm font-normal antialiased text-rw-gray"
                >
                  Boundaries
                </label>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default BasemapControls;
