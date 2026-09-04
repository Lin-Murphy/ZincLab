import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
export default defineConfig({ name: 'zinc-lab', title: 'Zinc Lab', projectId: 'lhlost58', dataset: 'production', plugins: [visionTool()], schema: { types: schemaTypes } });
