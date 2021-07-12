// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package controllers

import (
	"context"
	"fmt"

	"github.com/cosi-project/runtime/pkg/controller"
	"github.com/cosi-project/runtime/pkg/resource"
	"go.uber.org/zap"

	"github.com/talos-systems/theila/internal/backend/runtime/theila/resources"
)

const (
	// Namespace operated by the controller.
	Namespace = "default"
	// Name of the controller.
	Name = "UpgradeController"
)

// NewUpgradeController creates new UpgradeController.
func NewUpgradeController() *UpgradeController {
	return &UpgradeController{
		Namespace:      Namespace,
		ControllerName: Name,
	}
}

// UpgradeController calculates sum of IntResources into new IntResource.
type UpgradeController struct {
	Namespace      resource.Namespace
	ControllerName string
}

// Name implements controller.Controller interface.
func (ctrl *UpgradeController) Name() string {
	return ctrl.ControllerName
}

// Inputs implements controller.Controller interface.
func (ctrl *UpgradeController) Inputs() []controller.Input {
	return nil
}

// Outputs implements controller.Controller interface.
func (ctrl *UpgradeController) Outputs() []controller.Output {
	return []controller.Output{
		{
			Type: resources.UpgradeK8sTaskType,
			Kind: controller.OutputShared,
		},
	}
}

// Run implements controller.Controller interface.
func (ctrl *UpgradeController) Run(ctx context.Context, r controller.Runtime, logger *zap.Logger) error {
	if err := r.UpdateInputs([]controller.Input{
		{
			Namespace: ctrl.Namespace,
			Type:      resources.UpgradeK8sTaskType,
			Kind:      controller.InputWeak,
		},
	}); err != nil {
		return fmt.Errorf("error setting up dependencies: %w", err)
	}

	sourceMd := resource.NewMetadata(ctrl.Namespace, resources.UpgradeK8sTaskType, "", resource.VersionUndefined)

	for {
		select {
		case <-ctx.Done():
			return nil
		case <-r.EventCh():
		}

		tasks, err := r.List(ctx, sourceMd)
		if err != nil {
			return fmt.Errorf("error listing objects: %w", err)
		}

		for _, task := range tasks.Items {
			logger.Info("pending task", zap.String("task", task.String()))
		}
	}
}
