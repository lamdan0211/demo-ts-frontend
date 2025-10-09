'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import styles from './SingleSelect.module.css';

export interface SingleSelectOption {
  value: string;
  label: string;
  group?: string;
}

export interface SingleSelectProps {
  options: SingleSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option...",
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
  }, {} as Record<string, SingleSelectOption[]>);

  // Filter options based on search term
  const filteredOptions = Object.entries(groupedOptions).reduce((acc, [group, groupOptions]) => {
    const filtered = groupOptions.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[group] = filtered;
    }
    return acc;
  }, {} as Record<string, SingleSelectOption[]>);

  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    onChange('');
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedOption = options.find(option => option.value === value);

  // Show skeleton while mounting to prevent layout shift
  if (!isMounted) {
    return (
      <div className={`${styles.singleSelectContainer} ${styles.singleSelectSkeleton} ${className}`}>
        <div className={styles.singleSelectSkeletonTrigger}>
          <div className={styles.singleSelectSkeletonPlaceholder}></div>
          <div className={styles.singleSelectSkeletonIcon}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.singleSelectContainer} ${className}`}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            ref={triggerRef}
            className={styles.singleSelectTrigger}
            disabled={disabled}
            type="button"
          >
            <span className={styles.singleSelectDisplayValue}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            {isOpen ? (
              <ChevronUpIcon className={styles.singleSelectIcon} />
            ) : (
              <ChevronDownIcon className={styles.singleSelectIcon} />
            )}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
        <Popover.Content
          className={styles.singleSelectContent}
          style={{ width: triggerWidth }}
          sideOffset={4}
          align="start"
        >
          {/* Search Input */}
            <div className={styles.singleSelectSearchContainer}>
              <MagnifyingGlassIcon className={styles.singleSelectSearchIcon} />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.singleSelectSearchInput}
              />
            </div>

            {/* Options */}
            <div className={styles.singleSelectOptions}>
              {Object.entries(filteredOptions).map(([group, groupOptions]) => (
                <div key={group} className={styles.singleSelectGroup}>
                  <div className={styles.singleSelectGroupLabel}>{group}</div>
                  {groupOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.singleSelectOption} ${
                        value === option.value ? styles.singleSelectOptionSelected : ''
                      }`}
                      onClick={() => handleSelectOption(option.value)}
                    >
                      <span className={styles.singleSelectOptionLabel}>{option.label}</span>
                      {value === option.value && (
                        <CheckIcon className={styles.singleSelectCheckIcon} />
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};
