'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import styles from './MultiSelect.module.css';

interface MultiSelectOption {
  value: string;
  label: string;
  group?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  className = "",
  disabled = false,
  title = "Tất cả ngành nghề",
  subtitle = "Chọn ngành nghề"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  // Group options by group property
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'Other';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, MultiSelectOption[]>);

  // Filter options based on search term
  const filteredOptions = Object.entries(groupedOptions).reduce((acc, [group, groupOptions]) => {
    const filtered = groupOptions.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[group] = filtered;
    }
    return acc;
  }, {} as Record<string, MultiSelectOption[]>);

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      // Remove option if already selected
      const newValue = value.filter(v => v !== optionValue);
      onChange(newValue);
    } else {
      // Add option only if under limit
      if (value.length < 3) {
        const newValue = [...value, optionValue];
        onChange(newValue);
      }
    }
  };

  const handleSelectAll = () => {
    const allValues = options.map(option => option.value).slice(0, 3);
    onChange(allValues);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const selectedOptions = options.filter(option => value.includes(option.value));

  // Show skeleton while mounting to prevent layout shift
  if (!isMounted) {
    return (
      <div className={`${styles.multiSelectContainer} ${styles.multiSelectSkeleton} ${className}`}>
        <div className={styles.multiSelectSkeletonTrigger}>
          <div className={styles.multiSelectSkeletonPlaceholder}></div>
          <div className={styles.multiSelectSkeletonIcon}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.multiSelectContainer} ${className}`}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            ref={triggerRef}
            className={styles.multiSelectTrigger}
            disabled={disabled}
            type="button"
          >
            <div className={styles.multiSelectDisplayValue}>
              {selectedOptions.length > 0 ? (
                <div className={styles.multiSelectTags}>
                  {selectedOptions.map((option) => (
                    <span key={option.value} className={styles.multiSelectTag}>
                      <span className={styles.multiSelectTagText}>{option.label}</span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleOption(option.value);
                        }}
                        className={styles.multiSelectTagRemove}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                <span className={styles.multiSelectPlaceholder}>{placeholder || 'Select...'}</span>
              )}
            </div>
            {isOpen ? (
              <ChevronUpIcon className={styles.multiSelectIcon} />
            ) : (
              <ChevronDownIcon className={styles.multiSelectIcon} />
            )}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content 
            className={styles.multiSelectContent} 
            sideOffset={5}
            style={{ width: triggerWidth || '100%' }}
          >
            {/* Header */}
            <div className={styles.multiSelectHeader}>
              <h3 className={styles.multiSelectTitle}>{title}</h3>
            </div>

            {/* Search Input */}
            <div className={styles.multiSelectSearch}>
              <div className={styles.multiSelectSearchContainer}>
                <svg className={styles.multiSelectSearchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.multiSelectSearchInput}
                />
              </div>
            </div>

            {/* Subtitle */}
            <div className={styles.multiSelectSubtitle}>
              <span>{subtitle} ({value.length}/3)</span>
            </div>

            {/* Options */}
            <div className={styles.multiSelectOptions}>
              {Object.entries(filteredOptions).map(([group, groupOptions]) => (
                <div key={group} className={styles.multiSelectGroup}>
                  {Object.keys(groupedOptions).length > 1 && (
                    <div className={styles.multiSelectGroupLabel}>{group}</div>
                  )}
                  {groupOptions.map((option) => {
                    const isSelected = value.includes(option.value);
                    const isDisabled = !isSelected && value.length >= 3;
                    
                    return (
                      <label
                        key={option.value}
                        className={`${styles.multiSelectOption} ${isDisabled ? styles.multiSelectOptionDisabled : ''}`}
                      >
                        <Checkbox.Root
                          checked={isSelected}
                          onCheckedChange={() => handleToggleOption(option.value)}
                          className={styles.multiSelectCheckbox}
                          disabled={isDisabled}
                        >
                          <Checkbox.Indicator className={styles.multiSelectCheckboxIndicator}>
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className={styles.multiSelectOptionLabel}>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};