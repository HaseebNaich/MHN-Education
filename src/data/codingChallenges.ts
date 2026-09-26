import { CodingChallenge } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Algorithms',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
    ],
    starterCode: {
      python: 'def two_sum(nums, target):\n    # Write your Python code here\n    pass\n\nprint(two_sum([2, 7, 11, 15], 9))',
      javascript: 'function twoSum(nums, target) {\n  // Write your JS code here\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));',
      cpp: '#include <iostream>\n#include <vector>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    return {};\n}'
    },
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0, 1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1, 2]' }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Data Structures',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Bracket pairs must close in the correct order using a Stack data structure.',
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    starterCode: {
      python: 'def is_valid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else "#"\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint(is_valid("()[]{}"))',
      javascript: 'function isValid(s) {\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for (let char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}\n\nconsole.log(isValid("()[]{}"));'
    },
    testCases: [
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' }
    ]
  },
  {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Data Structures',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level using Breadth-First Search).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }
    ],
    starterCode: {
      python: '# BFS Level order implementation\ndef level_order(root):\n    if not root:\n        return []\n    # Implement BFS Queue logic\n    return []',
      javascript: 'function levelOrder(root) {\n  if (!root) return [];\n  // Implement BFS Queue logic\n  return [];\n}'
    },
    testCases: [
      { input: '[3,9,20]', expectedOutput: '[[3],[9,20]]' }
    ]
  }
];
