import type {
  DoWhileTaskDef,
  EventTaskDef,
  ForkJoinDynamicDef,
  ForkJoinTaskDef,
  HttpTaskDef,
  InlineTaskDef,
  JoinTaskDef,
  JsonJQTransformTaskDef,
  KafkaPublishTaskDef,
  SetVariableTaskDef,
  SimpleTaskDef,
  SubWorkflowTaskDef,
  SwitchTaskDef,
  TerminateTaskDef,
  WaitTaskDef,
  WorkflowDef,
} from "@io-orkes/conductor-javascript";
import { BlockDefProperties } from "./BlockDefDto";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export enum ValidationIssueType {
  ERROR = "ERROR",
  WANTING = "WANTING",
}

export enum ValidationReasonType {
  VALUE_REQUIRED = "VALUE_REQUIRED",
  VALUE_TYPE_NOT_MATCH = "VALUE_TYPE_NOT_MATCH",
  DO_WHILE_EMPTY_LOOP_OVER = "DO_WHILE_EMPTY_LOOP_OVER",
}

export interface ValidationIssueReason {
  type: ValidationReasonType;
  name: string;
}

export interface WorkflowValidationIssue {
  taskReferenceName: string;
  issueType: ValidationIssueType;
  detailReason: ValidationIssueReason;
  humanMessage: {
    en: string;
    zh: string;
  };
}

export interface WorkflowTriggerConfig {
  triggerType: WorkflowTriggerType;
  cron?: string;
}

export enum WorkflowTriggerType {
  // 手动
  MANUALLY = "MANUAL",
  // 定时
  SCHEDULER = "SCHEDULER",
  WEBHOOK = "WEBHOOK",
}

export interface MonkeySubWorkflowTaskDef extends SubWorkflowTaskDef {
  subWorkflow?: DeepPartial<MonkeyWorkflow>;
}

export declare type MonkeyTaskDefTypes =
  | SimpleTaskDef
  | DoWhileTaskDef
  | EventTaskDef
  | ForkJoinTaskDef
  | ForkJoinDynamicDef
  | HttpTaskDef
  | InlineTaskDef
  | JsonJQTransformTaskDef
  | KafkaPublishTaskDef
  | SetVariableTaskDef
  | MonkeySubWorkflowTaskDef
  | SwitchTaskDef
  | TerminateTaskDef
  | JoinTaskDef
  | WaitTaskDef;

export interface MonkeyWorkflowDef extends WorkflowDef {
  tasks: MonkeyTaskDefTypes[];
}

export interface MonkeyWorkflow {
  workflowId: string;
  name: string;
  version: number;
  description?: string;
  iconUrl?: string;
  validated: boolean;
  creatorUserId: string;
  teamId: string;
  pointCost?: number;
  workflowDef: MonkeyWorkflowDef;
  createdTimestamp: number;
  updatedTimestamp: number;
  variables?: BlockDefProperties[];
  isDeleted: false;
  hidden?: boolean;
  masterWorkflowId?: string;
  masterWorkflowVersion?: number;
  validationIssues?: WorkflowValidationIssue[];
  trigger?: WorkflowTriggerConfig;
  output?: { key: string; value: string }[];
}
