import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
export default defineConfig({ name: 'zinc-lab', title: 'Zinc Lab', projectId: 'lhlost58', dataset: 'production', plugins: [structureTool(), visionTool()], schema: { types: schemaTypes } });
