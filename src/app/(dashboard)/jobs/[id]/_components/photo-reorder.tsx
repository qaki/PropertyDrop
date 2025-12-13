"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Loader2 } from "lucide-react";
import { updatePhotoOrder } from "~/app/actions/jobs";
import { toast } from "sonner";

interface Asset {
  id: string;
  originalFilename: string;
  mlsKey: string | null;
  originalKey: string;
  order: number;
}

interface PhotoReorderProps {
  jobId: string;
  initialAssets: Asset[];
}

function SortablePhoto({ asset }: { asset: Asset }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: asset.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Construct preview URL
  const previewUrl = `/api/asset/${asset.id}/preview`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border bg-card p-3 hover:bg-accent/50 transition-colors"
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      
      <img
        src={previewUrl}
        alt={asset.originalFilename}
        className="h-16 w-16 rounded object-cover"
      />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{asset.originalFilename}</p>
        <p className="text-xs text-muted-foreground">
          {asset.mlsKey ? "Processed" : "Original"}
        </p>
      </div>
    </div>
  );
}

export function PhotoReorder({ jobId, initialAssets }: PhotoReorderProps) {
  const [assets, setAssets] = useState(initialAssets);
  const [isPending, startTransition] = useTransition();
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAssets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setHasChanges(true);
    }
  }

  async function handleSaveOrder() {
    startTransition(async () => {
      const assetIds = assets.map((a) => a.id);
      const result = await updatePhotoOrder(jobId, assetIds);

      if (result.success) {
        toast.success("Photo order saved!");
        setHasChanges(false);
      } else {
        toast.error(result.error || "Failed to save order");
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Photo Order</h3>
          <p className="text-sm text-muted-foreground">
            Drag photos to reorder how they appear to clients
          </p>
        </div>
        
        {hasChanges && (
          <button
            onClick={handleSaveOrder}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Order
          </button>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={assets} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {assets.map((asset) => (
              <SortablePhoto key={asset.id} asset={asset} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {assets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No photos uploaded yet
        </div>
      )}
    </div>
  );
}

